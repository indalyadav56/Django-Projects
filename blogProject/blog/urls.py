from django.contrib import admin
from django.urls import path,include
from .views import HomeView,PostDetails,CreatePost,DeletePost,UpdatePost,AboutView,ContactView

urlpatterns = [
    path('', HomeView.as_view(),name="home"),
    path('about/', AboutView.as_view(),name="about"),
    path('contact/', ContactView.as_view(),name="contact"),
    path('post-<int:pk>/', PostDetails.as_view(),name="post_details"),
    path('create/post/', CreatePost.as_view(),name="create_post"),
    path('delete/<int:pk>/', DeletePost.as_view(),name="delete_post"),
    path('update/<int:pk>/', UpdatePost.as_view(),name="update_post"),
]
