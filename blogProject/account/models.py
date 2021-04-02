from django.db import models
from django.contrib.auth.models import User
from django import forms

class Profile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    image=models.ImageField(upload_to="profile/",default="profile/person.png",blank=True,null=True)
    
    def __str__(self):
        return self.user.username

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model=User
        fields=['email','first_name','last_name']

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model=Profile
        fields=['image']