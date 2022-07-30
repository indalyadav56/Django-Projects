from django.contrib import admin
from django.urls import path,include
from .views import PostAPIView,StoryAPIView,LikeAPIView,CommentAPIView

urlpatterns = [
    
    path('user/post/',PostAPIView.as_view() ),
    path('user/post/<int:id>/',PostAPIView.as_view() ),
    path('user/stories/',StoryAPIView.as_view() ),
    path('likes/',LikeAPIView.as_view() ),
    path('likes/<int:id>/',LikeAPIView.as_view() ),
    path('comment/',CommentAPIView.as_view() ),
    path('comment/<int:id>/',CommentAPIView.as_view() ),
]
