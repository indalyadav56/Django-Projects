from django.contrib import admin
from django.urls import path
from .import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('user/registration/', views.user_register, name='register'),
    path('user/dashboard/', views.dashboard, name='dashboard'),
    path('user/logout/', views.user_logout, name='logout'),
    path('user/forget-password/', views.user_forget_password, name='changePassword'),
]
