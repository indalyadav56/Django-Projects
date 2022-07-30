from django.contrib import admin
from django.urls import path,include
from .views import ProfileAPIView

urlpatterns = [
    
    path('profile/',ProfileAPIView.as_view() ),
    path('profile/<int:id>/',ProfileAPIView.as_view() ),
]
