from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
# Create your views here.

class RegisterView(APIView):
    def post(self,request):
        serializers =UserSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"error":False,"message":f"user is created for '{serializers.data['email']}' ","data":serializers.data})
        return Response({"error":True,"message":"A user with this email already exists! Try Anather Email"})
        