from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import ChatSerializer

from .models import Chat

# Chat APIView
class ChatAPIView(APIView):
  
  def get(self,req):
    chat_obj=Chat.objects.all()
    chat_ser=ChatSerializer(chat_obj,many=True)
    return Response(chat_ser.data)

  def post(self,req):
    return Response({'message':'success'})