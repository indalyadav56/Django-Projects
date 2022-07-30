from django.db import models
from apps.account.models import NewUser as User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.

class UserProfile(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='profile')
    user_image=models.ImageField(upload_to="profile",default="profile.jpg")
    user_mobile=models.CharField(max_length=15,blank=True,null=True)
    user_bgImage=models.ImageField(upload_to="profile/background",default="background.jpg")
    dob=models.DateField(blank=True,null=True)

    def __str__(self):
        return self.user.email

@receiver(post_save,sender=User)
def create_profile(sender,instance,created,**kwargs):
    if created:
        UserProfile.objects.create(user=instance)