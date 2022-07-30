from rest_framework import serializers
from .models import NewUser as User
from apps.userProfile.serializers import UserProfileSerializer

class UserSerializer(serializers.ModelSerializer):
    profile=UserProfileSerializer(many=True,read_only=True)
    class Meta:
        model=User
        fields=['id','username','full_name','email','password',"profile"]
        extra_kwargs = {'password':{'write_only':True,'required':True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance