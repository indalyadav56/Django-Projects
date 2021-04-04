from django.urls import path,include
from .views import AllUserListView, HomeView,PostCreateView,PostListView,AllUserListView

from .import views

urlpatterns = [
    path('',HomeView.as_view(),name="home"),
    path('post/create/',PostCreateView.as_view(),name="user_post"),
    path('all/post/',PostListView.as_view(),name="all_post"),
    path('all/user/',AllUserListView.as_view(),name="all_user"),

    path('follow/user/<int:pk>',views.follow_user,name="follow_user"),
    path('unfollow/user/<int:pk>',views.unfollow_user,name="unfollow_user"),

    path('like/post/<int:pk>',views.like_user,name="like_user"),
    path('dislike/post/<int:pk>',views.dislike_user,name="dislike_user"),

    path('comment/post/<int:pk>',views.post_comment,name="post_comment"),



   
]
