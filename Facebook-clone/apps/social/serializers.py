from rest_framework import serializers
from .models import UserPost,UserStory,Like,Comment

class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserPost
        fields=["id","title","image","created_at","like","user"]
        depth=3
    
    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(image)

class UserStorySerializer(serializers.ModelSerializer):
    class Meta:
        model=UserStory
        fields="__all__"
        depth=2
    
    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(image)


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Like
        fields="__all__"

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields=["id","post","value","create"]
    

        