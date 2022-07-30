from django.urls import path

from . import views

urlpatterns = [
    path('auth/<slug:slug>/', views.AuthUserView.as_view(), name='rest-auth'),
]