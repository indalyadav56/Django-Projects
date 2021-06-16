from django.contrib import admin
from django.urls import path
from .views import HomeView,deleteTodo,EditTodo

urlpatterns = [
    
    path('',HomeView.as_view(),name="home"),
    path('delete/<int:id>/',deleteTodo,name="delete"),
    path('edit/<int:id>/',EditTodo,name="edit"),
]
