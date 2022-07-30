from django.contrib import admin
from django.urls import path,include
from .views import CreateUserAPIView,UserAPIView

urlpatterns = [
    
    path('user/create/',CreateUserAPIView.as_view() ),
    path('all/user/',UserAPIView.as_view() ),
    path('all/user/<int:id>/',UserAPIView.as_view() ),
]
