from django.contrib import admin
from django.urls import path
from .views import RegisterView

urlpatterns = [
    path('user/register/', RegisterView.as_view(),name="register"),
]