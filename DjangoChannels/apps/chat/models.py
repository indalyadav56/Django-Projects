from distutils.command.upload import upload
from statistics import mode
from django.db import models

# Create your models here.

class Chat(models.Model):
  username=models.CharField(max_length=255)
  name=models.CharField(max_length=255)
  message=models.TextField()
  date=models.DateField(auto_now=True)
  time=models.TimeField(auto_now=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class ChatGroup(models.Model):
  group_name= models.CharField(max_length=500)
  # chat=models.ForeignKey(Chat,on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
