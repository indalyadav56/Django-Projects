from django.shortcuts import render,redirect
from django.views.generic import View
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import ProfileUpdateForm,UserUpdateForm,Profile
class RegisterView(View):
    def get(self,request):
        form=UserCreationForm()
        return render(request,"account/register.html",{'form':form})

    
    def post(self,request):
        form=UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/account/login/")
        return redirect("register")


class ProfileView(LoginRequiredMixin,View):
    def get(self,request):
        p_form=ProfileUpdateForm(instance=request.user.profile)
        u_form=UserUpdateForm(instance=request.user)
        context={
            'u_form':u_form,
            'p_form':p_form
        }
        return render(request,"account/profile.html",context)
    
    def post(self,request,*args,**kwargs):
        p_form=ProfileUpdateForm(request.POST,request.FILES,instance=request.user.profile)
        u_form=UserUpdateForm(request.POST,instance=request.user)

        u_form.save()
        p_form.save()
        return redirect("profile")