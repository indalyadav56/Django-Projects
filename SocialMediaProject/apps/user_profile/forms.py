from django import forms
from .models import Profile


class UserProfileForm(forms.ModelForm):
    class Meta:
        model=Profile
        fields=["full_name","user_pic","user_bio","phone_no","gender"]
