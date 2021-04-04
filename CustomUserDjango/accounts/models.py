from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, password, **other_fields):
        if not email:
            raise ValueError("must have an email address")
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        if other_fields.get('is_staff') is not True:
            raise ValueError('superuser must have staff fields true')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('super user must have superuser field')
        return self.create_user(email, password, **other_fields)

    def create_user(self, email,   password, **other_fields):
        if not email:
            raise ValueError("User must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email,  **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    # user_name = models.CharField(max_length=30, unique=True)
    # first_name = models.CharField(max_length=100, unique=True)
    start_date = models.DateTimeField(auto_now_add=True)
    about = models.TextField(max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomAccountManager()
