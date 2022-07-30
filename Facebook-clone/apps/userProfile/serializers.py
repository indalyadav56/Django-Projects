from rest_framework import serializers
from apps.account.models import NewUser as User
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserProfile
        fields='__all__'
        depth=1
        
    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(image)
