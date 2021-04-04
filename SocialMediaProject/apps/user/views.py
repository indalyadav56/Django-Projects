from django.db import models
from django.shortcuts import redirect, render,redirect
from django.views.generic import TemplateView,CreateView
from django.contrib.auth.views import LoginView,LogoutView
from .models import User
from django.urls import reverse_lazy
from django.http import HttpResponseRedirect
from .forms import UserRegisterForm


class RegisterView(CreateView):
    def get(self, request, *args, **kwargs):
        context = {'form': UserRegisterForm()}
        return render(request, 'user/register.html', context)

    def post(self, request, *args, **kwargs):
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse_lazy('login'))
        return render(request, 'user/register.html', {'form': form})



class UserLogin(LoginView):
    template_name="user/login.html"
   