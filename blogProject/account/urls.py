from django.contrib import admin
from django.urls import path,include
from .views import RegisterView,ProfileView
from django.contrib.auth import views as auth_view

urlpatterns = [
    path('register/',RegisterView.as_view(),name="register"),
    path('login/',auth_view.LoginView.as_view(template_name="account/login.html"),name="login"),
    path('logout/',auth_view.LogoutView.as_view(),name="logout"),
    path('profile/',ProfileView.as_view(),name="profile"),
]
