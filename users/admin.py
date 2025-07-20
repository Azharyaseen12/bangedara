from django.contrib import admin
from .models import Blog, ContactMessage, Comment, Reply, PDFBook

# Register your models here.
admin.site.register(Blog)
admin.site.register(ContactMessage)
admin.site.register(Comment)
admin.site.register(Reply)
admin.site.register(PDFBook)
