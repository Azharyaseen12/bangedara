from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, BlogSerializer, ContactMessageSerializer, CommentSerializer, ReplySerializer
from django.contrib.auth.models import User
from .models import Blog, ContactMessage, Comment, Reply
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import FileResponse, Http404
from django.conf import settings
import os
from rest_framework.views import APIView
import logging

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        blog_id = self.kwargs['blog_id']
        return Comment.objects.filter(blog_id=blog_id).select_related('user').prefetch_related('replies__user')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, blog_id=self.kwargs['blog_id'])

    def post(self, request, *args, **kwargs):
        print('DEBUG POST DATA:', request.data)
        response = super().post(request, *args, **kwargs)
        if response.status_code == 400:
            print('DEBUG SERIALIZER ERRORS:', response.data)
        return response

class ReplyListCreateView(generics.ListCreateAPIView):
    serializer_class = ReplySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        comment_id = self.kwargs['comment_id']
        return Reply.objects.filter(comment_id=comment_id).select_related('user')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, comment_id=self.kwargs['comment_id'])
