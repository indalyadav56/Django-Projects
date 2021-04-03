from django.contrib import auth
from django.shortcuts import redirect, render
from .forms import UserRegisterForm
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from django.contrib.auth.decorators import login_required


# Create your views here.
@login_required
def dashboard(request):
    return render(request, 'accountapp/dashboard.html')


def home_view(request):
    if not request.user.is_authenticated:
        if request.method == "POST":
            form = AuthenticationForm(request=request, data=request.POST)
            if form.is_valid():
                uname = form.cleaned_data['username']
                upass = form.cleaned_data['password']
                user = authenticate(username=uname, password=upass)
                if user is not None:
                    login(request, user)
                    messages.success(request, "Successfully Logged in!")
                    return redirect(dashboard)

        else:
            form = AuthenticationForm()
        return render(request, 'accountapp/home.html', {'form': form})
    else:
        return redirect(dashboard)


def user_register(request):
    if request.method == "POST":
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Successfully Registerd!")
            return redirect("/")
    else:
        form = UserRegisterForm()
    return render(request, 'accountapp/register.html', {'form': form})


def user_logout(request):
    logout(request)
    return redirect("/")


@login_required
def user_forget_password(request):
    if request.method == "POST":
        form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Successfully Updated!")
            return redirect(dashboard)
    else:
        form = PasswordChangeForm(user=request.user)
    return render(request, 'accountapp/forget-password.html', {'form': form})
