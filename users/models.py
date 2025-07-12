from django.db import models
from django.contrib.auth.models import User
import re

# Create your models here.

class Blog(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('ur', 'Urdu'),
        ('mixed', 'Mixed'),
    ]
    
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True, null=True)  # Made optional
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES, default='en')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs')
    pdf = models.FileField(upload_to='blog_pdfs/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def detect_language(self, text):
        """Detect if text contains Urdu characters"""
        if not text:
            return 'en'
        
        # Urdu Unicode range: \u0600-\u06FF (Arabic), \u0750-\u077F (Arabic Supplement), \u08A0-\u08FF (Arabic Extended-A)
        urdu_pattern = re.compile(r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]')
        english_pattern = re.compile(r'[a-zA-Z]')
        
        urdu_chars = len(urdu_pattern.findall(text))
        english_chars = len(english_pattern.findall(text))
        
        if urdu_chars > english_chars:
            return 'ur'
        elif english_chars > urdu_chars:
            return 'en'
        else:
            return 'mixed'

    def save(self, *args, **kwargs):
        # Detect language from title and content
        title_lang = self.detect_language(self.title)
        content_lang = self.detect_language(self.content or '')
        
        # If both are same language, use that, otherwise mixed
        if title_lang == content_lang:
            self.language = title_lang
        else:
            self.language = 'mixed'
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class Comment(models.Model):
    blog = models.ForeignKey(Blog, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user.username} on {self.blog.title}'

class Reply(models.Model):
    comment = models.ForeignKey(Comment, related_name='replies', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Reply by {self.user.username} on comment {self.comment.id}'

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} <{self.email}>"
