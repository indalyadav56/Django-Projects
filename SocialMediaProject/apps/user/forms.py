from django import forms
from django.db import models
from django.forms import fields
from .models import User
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm



class UserRegisterForm(UserCreationForm):
    class Meta:
        model=User
        fields=["email"]
