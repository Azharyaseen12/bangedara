from django.urls import path, include
from .views import RegisterView, ContactMessageCreateView, CommentListCreateView, ReplyListCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import BlogViewSet

router = DefaultRouter()
router.register(r'blogs', BlogViewSet, basename='blog')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact'),
    path('blogs/<int:blog_id>/comments/', CommentListCreateView.as_view(), name='blog-comments'),
    path('comments/<int:comment_id>/replies/', ReplyListCreateView.as_view(), name='comment-replies'),
    path('', include(router.urls)),
] 