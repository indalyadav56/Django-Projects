from django import forms
from django.forms import fields, models 
from .models import PostComment


class PostCommentForm(forms.ModelForm):
    class Meta:
        model=PostComment
        fields=["comment"]