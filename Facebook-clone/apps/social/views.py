from django.shortcuts import render
from .models import UserPost,UserStory,Like,Comment
from .serializers import UserPostSerializer,UserStorySerializer,LikeSerializer,CommentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from apps.account.models import NewUser as User
# Create your views here.


class PostAPIView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

    def get(self,request,id=None):
        if id is not None:
            user=User.objects.get(id=id)
            user_post=UserPost.objects.filter(user=user).order_by("-id")
            user_post_sr=UserPostSerializer(user_post,many=True,context={'request':request})
            return Response(user_post_sr.data)

        user_post_obj=UserPost.objects.filter(user=request.user).order_by('-id')
        user_post_sr=UserPostSerializer(user_post_obj,many=True,context={'request':request})
        return Response(user_post_sr.data)

    def post(self,request):
        user_post=UserPost.objects.create(
            user=request.user,
            title=request.data['title'],
            image=request.data['image']
        )
        return Response({
                'error':False,
                'message':"post added succesfully!",
            })

class StoryAPIView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

    def get(self,request):
        user_obj=UserStory.objects.filter(user=request.user)
        user_story_ser=UserStorySerializer(user_obj,many=True,context={
            'request':request
        })
        return Response(user_story_ser.data)
    
    def post(self,request):
        user_story=UserStory.objects.create(
            user=request.user,
            image=request.data['image']
        )
        return Response({
            'error':False,
            'message':'successfully story created!'
        })



class LikeAPIView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

    def get(self,request,id=None):
        if id is not None:
            user_post=UserPost.objects.get(id=id)
            like=Like.objects.filter(post=user_post)
            like_ser=LikeSerializer(like,many=True)
            return Response(like_ser.data)


            
        return Response({
            'message':'success'
        })
     

    def post(self,request):
        user_post=UserPost.objects.get(id=1)
        like=LikeSerializer(user_post,data=request.data)
        if like.is_valid():
            return Response(like.data)


class CommentAPIView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

    def get(self,request,id=None):
        if id is not None:
            user_post=UserPost.objects.get(id=id)
            comment=Comment.objects.filter(post=user_post)
            comment_ser=CommentSerializer(comment,many=True)
            return Response(comment_ser.data)

    def post(self,request):
        id=request.data['id']
        title=request.data['title']
        user_post=UserPost.objects.get(id=id)
        comment=Comment.objects.create(
            user=request.user,
            post=user_post,
            value=title
        )
        print(user_post)
        return Response({
            'error':False,
            'message':'success'
        })
