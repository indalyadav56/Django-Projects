from django.contrib.auth import login
from django.db import models
from django.forms.forms import Form
from django.shortcuts import render
from .forms import UserProfileForm
from django.views.generic import UpdateView
from .models import Profile

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator


@method_decorator(login_required,name="dispatch")
class UserProfile(UpdateView):
    template_name="user_profile/profile.html"
    model=Profile
    form_class=UserProfileForm
    success_url="/"

    
