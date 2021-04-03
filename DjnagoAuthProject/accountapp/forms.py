from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.forms import fields, models, widgets
from django.contrib.auth.models import User


class UserRegisterForm(UserCreationForm):
    password2 = forms.CharField(
        label="Confirm Password", widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.TextInput(attrs={'class': 'form-control'}),
        }


class UserUpdateForm(UserChangeForm):
    class Meta:
        model = User
        fields = "__all__"
