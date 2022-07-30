from django.shortcuts import render
from rest_framework.response import Response
import requests
from .serializers import LoginSerializer, ResetPasswordSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from rest_framework.views import APIView
import json

class AuthUserView(APIView):
    permission_classes = [AllowAny]
    domain = settings.AUTH0_DOMAIN
    audience = settings.AUTH0_API_AUDIENCE
    client_id = settings.AUTH0_CLIENT_ID
    client_secret = settings.AUTH0_CLIENT_SECRET
    connection_name=settings.AUTH0_CONNECTION_NAME

    def post(self, request, *args, **kwargs):
        # handle custom routes
        action = kwargs.get('slug', None)
        if action == 'login':
            return self.login(request)
        elif action == 'forgot_password':
            return self.forgot_password(request)
        else:
            return self.logout(request)

    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # auth0 creds
        data = serializer.validated_data

        url = f'https://{self.domain}/oauth/token'
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        payload = {
            'grant_type': 'password',
            'username': data.get('email'),
            'password': data.get('password'),
            'scope': 'openid profile email',
            'audience': self.audience,
            'client_id': self.client_id,
            'client_secret': self.client_secret
        }
        try:
            response = requests.request(
                'POST',
                url,
                headers=headers,
                data=payload
            )
        except Exception as e:
            return Response(
                {'error': 'Unable to complete login'},
                status=500
            )
        return Response(response.json(), status=response.status_code)
    
    def logout(self, request):
        pass
    
    def forgot_password(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')

        url = f'https://{self.domain}/dbconnections/change_password'
        headers = {
            'Content-Type': 'application/json',
            'auth0-forwarded-for': ip
        }

        payload = {
            "client_id": self.client_id,
            "email": data.get('email'),
            "connection": self.connection_name
        }

        try:
            response = requests.post(
                url,
                json.dumps(payload),
                headers=headers
            )
        except Exception as e:
            return Response(
                {'error': 'Unable to complete password reset'},
                status=500
            )
        return Response({'message': response.text}, status=response.status_code)