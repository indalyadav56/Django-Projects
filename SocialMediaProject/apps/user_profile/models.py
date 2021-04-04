from django.db import models
from apps.user.models import User

class Profile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile")
    full_name=models.CharField(max_length=150,blank=True,null=True)
    user_pic=models.ImageField(upload_to="users/" ,blank=True,null=True)
    user_bio=models.CharField(max_length=255,blank=True,null=True)
    phone_no=models.CharField(max_length=15,blank=True,null=True)
    gender=models.CharField(choices=(("Male","Male"),("Female","Female")),default="Male",max_length=50)
    created_at=models.DateTimeField(auto_now_add=True)

    
    
