from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Blog, ContactMessage, Comment, Reply

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': "Passwords don't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

class BlogSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    pdf = serializers.FileField(required=False, allow_null=True)
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author', 'author_username', 'pdf', 'created_at', 'updated_at']
        read_only_fields = ['author', 'author_username', 'created_at', 'updated_at']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class ReplySerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Reply
        fields = ['id', 'comment', 'user', 'user_username', 'content', 'created_at']
        read_only_fields = ['id', 'user', 'user_username', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    replies = ReplySerializer(many=True, read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'blog', 'user', 'user_username', 'content', 'created_at', 'replies']
        read_only_fields = ['id', 'user', 'user_username', 'created_at', 'replies', 'blog'] 