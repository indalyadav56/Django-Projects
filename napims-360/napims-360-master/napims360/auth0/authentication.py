import requests
from django.conf import settings
from django.contrib.auth import get_user_model
from jose import jwt
from rest_framework import exceptions
from rest_framework.authentication import (BaseAuthentication,
                                           get_authorization_header)

from napims360.apps.authentication.models import Auth0User
from napims360.apps.authentication.utils import get_mgt_token

User = get_user_model()


def is_valid_auth0token(token, context=None):
    # TODO: remove request and make the `json` file as part of the project to save the request time
    resp = requests.get('https://'+settings.AUTH0_DOMAIN +
                        '/.well-known/jwks.json')
    jwks = resp.json()
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    for key in jwks['keys']:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n': key['n'],
                'e': key['e']
            }
    if rsa_key:
        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=settings.AUTH0_ALGORITHMS,
                audience=settings.AUTH0_API_AUDIENCE,
                issuer='https://'+settings.AUTH0_DOMAIN+'/'
            )
            return payload, True
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('token is expired')
        except jwt.JWTClaimsError:
            raise exceptions.AuthenticationFailed(
                'incorrect claims, please check the audience and issuer'
            )
        except Exception as e:
            raise exceptions.AuthenticationFailed(
                'Unable to parse authentication'
            )

    return {}, False

def is_valid_auth0token2(token, context=None):
    # TODO: remove request and make the `json` file as part of the project to save the request time
    resp = requests.get('https://'+settings.AUTH0_DOMAIN +
                        '/.well-known/jwks.json')
    jwks = resp.json()
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    for key in jwks['keys']:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n': key['n'],
                'e': key['e']
            }
    if rsa_key:
        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=settings.AUTH0_ALGORITHMS,
                audience=settings.AUTH0_API_AUDIENCE,
                issuer='https://'+settings.AUTH0_DOMAIN+'/'
            )
            return payload
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('token is expired')
        except jwt.JWTClaimsError:
            raise exceptions.AuthenticationFailed(
                'incorrect claims, please check the audience and issuer'
            )
        except Exception as e:
            raise exceptions.AuthenticationFailed(
                'Unable to parse authentication'
            )

    return {}

def get_username_from_payload(payload):
    return payload['sub']

def get_auth0_user_data(token, request=None):
    url = 'https://' + settings.AUTH0_DOMAIN + '/userinfo'
    params = {'access_token': token}
    resp = requests.get(url, params)
    data = resp.json()
    return data

def get_auth0_user(username):
    url = f"https://{settings.AUTH0_DOMAIN}/api/v2/users/{username}"
    headers = {
        'content-type': "application/json",
        'authorization': f"Bearer {get_mgt_token()}",
        'cache-control': "no-cache"
    }
    response = requests.get(
        url,
        headers=headers
    )
    return response.json()

def get_user_by_natural_key(username):
    auth0_username = username.split('|')[1]
    auth0_user = Auth0User.objects.filter(username=auth0_username).last()
    if not auth0_user:
        user_data = get_auth0_user(username)
        email = user_data.get('email')
        if not email:
            raise exceptions.AuthenticationFailed('Invalid token headers')

        user, _ = User.objects.get_or_create(email=email)
        auth0_user = Auth0User.objects.create(
            username=auth0_username, user=user)
        auth0_user.user = user
        auth0_user.save()
    return auth0_user.user


class Auth0TokenAuthentication(BaseAuthentication):
    '''
    Auth0 token based authentication.
    Clients should authenticate by passing the token key in the 'Authorization'
    HTTP header, prepended with the string 'Bearer '.  For example:
        Authorization: JWT <token data>
    '''

    keyword = 'JWT'
    err_msg = 'Invalid token headers'

    def authenticate(self, request):
        auth = get_authorization_header(request).split()

        if not auth or auth[0].lower() != self.keyword.lower().encode():
            return None

        if len(auth) == 1:
            raise exceptions.AuthenticationFailed(self.err_msg)

        if len(auth) > 2:
            raise exceptions.AuthenticationFailed(self.err_msg)
        token = auth[1]
        return self.authenticate_credentials(token)

    def authenticate_credentials(self, token):
        payload, is_valid = is_valid_auth0token(token)
        if not is_valid:
            raise exceptions.AuthenticationFailed(self.err_msg)

        auth0_username = payload['sub'].split('|')[1]
        auth0_user = Auth0User.objects.filter(username=auth0_username).last()
        if not auth0_user:
            user_data = get_auth0_user_data(token)
            email = user_data.get('email')
            if not email:
                raise exceptions.AuthenticationFailed(self.err_msg)

            user, _ = User.objects.get_or_create(email=email)
            auth0_user = Auth0User.objects.create(
                username=auth0_username, user=user)
            auth0_user.user = user
            auth0_user.save()
        return auth0_user.user, token