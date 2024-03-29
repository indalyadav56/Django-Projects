from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Post(models.Model):
    author=models.ForeignKey(User,on_delete=models.CASCADE)
    image=models.ImageField(upload_to="post/",null=True,blank=True)
    title=models.CharField(max_length=200)
    content=models.TextField()
    date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title