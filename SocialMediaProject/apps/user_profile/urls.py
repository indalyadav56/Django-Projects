from django.urls import path,include
from .views import UserProfile

urlpatterns = [
    path('<int:pk>',UserProfile.as_view(),name="profile" ),
]
