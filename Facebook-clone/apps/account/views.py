from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import NewUser as User
from apps.userProfile.models import UserProfile
from apps.userProfile.serializers import UserProfileSerializer
from rest_framework import status
# Create your views here.

class CreateUserAPIView(APIView):

    def post(self,request):
        serializer = UserSerializer(data=request.data,context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       

class UserAPIView(APIView):
    def get(self,request,id=None):
        if id is not None:
            user_obj=User.objects.get(id=id)
            user_ser=UserSerializer(user_obj,context={'request':request})
            return Response(user_ser.data)
        user_obj=User.objects.all()
        user_ser=UserSerializer(user_obj,many=True,context={'request':request})
        return Response(user_ser.data)