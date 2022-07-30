from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.
class Auth0User(models.Model):
    username = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.username
