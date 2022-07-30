from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
  
    async def connect(self):
        print('username',)
        group_name = self.scope["url_route"]["kwargs"]["username"]
        self.room_name = self.scope['url_route']['kwargs']['username']
        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
    

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['data']

        await self.channel_layer.group_send(
            self.room_group_name,{
                'type':'chat_message',
                'value':message
            }
        )

    async def disconnect(self, close_code):
        pass


    async def chat_message(self,event):
        await self.send(text_data=json.dumps({
            'data': event['value']
        }))