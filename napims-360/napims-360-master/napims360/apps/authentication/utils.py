import graphene
from django.conf import settings
import requests



def get_mgt_token():
    payload = {
        'grant_type': 'client_credentials',
        'client_id': settings.AUTH0_CLIENT_ID,
        'client_secret': settings.AUTH0_CLIENT_SECRET,
        'audience': f'https://{settings.AUTH0_DOMAIN}/api/v2/',
    }
    response = requests.post(f'https://{settings.AUTH0_DOMAIN}/oauth/token', data=payload)
    oauth = response.json()
    return oauth.get('access_token')


def get_permissions():
    url = f"https://{settings.AUTH0_DOMAIN}/api/v2/resource-servers/{settings.AUTH0_API_ID}"
    headers = {
        'content-type': "application/json",
        'authorization': f"Bearer {get_mgt_token()}",
        'cache-control': "no-cache"
    }
    response = requests.get(url, headers=headers)
    return response.json()['scopes']

def get_role(id=None, userId=None):
    if id:
        url = f"https://{settings.AUTH0_DOMAIN}/api/v2/roles/{id}"
    elif userId:
        url = f"https://{settings.AUTH0_DOMAIN}/api/v2/users/{userId}/roles"
    else:
        url = f"https://{settings.AUTH0_DOMAIN}/api/v2/roles"
    headers = {
        'content-type': "application/json",
        'authorization': f"Bearer {get_mgt_token()}",
        'cache-control': "no-cache"
    }
    response = requests.get(url, headers=headers)
    if id:
        return [response.json()]
    return response.json()




