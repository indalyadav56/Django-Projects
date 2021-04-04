from .models import Profile
from django.db.models.signals import post_save
from django.dispatch.dispatcher import receiver
from apps.user.models import User


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

