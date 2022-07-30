from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.account.models import NewUser as User
from apps.account.serializers import UserSerializer
from .serializers import UserProfileSerializer
from .models import UserProfile
# Create your views here.


class ProfileAPIView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

    def get(self, request,id=None):
        if id is not None:
            user=User.objects.get(id=id)
            userPorfile=UserProfile.objects.get(user=user)
            user_profile_ser=UserProfileSerializer(userPorfile,context={'request':request})
            return Response(user_profile_ser.data)
        user_obj = UserProfile.objects.get(user=request.user)
        user_ser = UserProfileSerializer(user_obj,context={'request':request})
        return Response(user_ser.data)
    

    def put(self,request):
        user_obj=UserProfile.objects.get(user=request.user)
        userprofile_ser=UserProfileSerializer(user_obj,data=request.data ,partial=True,context={'request':request})
        if userprofile_ser.is_valid():
            userprofile_ser.save()
            return Response(userprofile_ser.data)
        return Response({
            'error':True,
            'message':'some error occured! try again'
        })
    
    # def patch(self, request, pk):
    #     testmodel_object = self.get_object(pk)
    #     serializer = TestModelSerializer(testmodel_object, data=request.data, partial=True) # set partial=True to update a data partially
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(code=201, data=serializer.data)
    #     return JsonResponse(code=400, data="wrong parameters")