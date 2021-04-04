from django.urls import path,include
from .views import UserLogin,RegisterView

from django.contrib.auth.views import LogoutView


urlpatterns = [
    path('login/', UserLogin.as_view(),name="login"),
    path('register/', RegisterView.as_view(),name="register"),
     path("logout/", LogoutView.as_view(), name="logout"),
]
