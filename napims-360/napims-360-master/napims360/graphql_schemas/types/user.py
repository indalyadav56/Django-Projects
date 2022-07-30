import graphene
import requests
import json
from django.conf import settings
from napims360.apps.authentication.utils import get_mgt_token
from graphql_jwt.decorators import login_required

domain = settings.AUTH0_DOMAIN
audience = settings.AUTH0_API_AUDIENCE
client_id = settings.AUTH0_CLIENT_ID
client_secret = settings.AUTH0_CLIENT_SECRET
connection_name = settings.AUTH0_CONNECTION_NAME
api_id = settings.AUTH0_API_ID


class UserMetaData(graphene.ObjectType):
    first_name = graphene.String()
    last_name = graphene.String()
    asset_group = graphene.String()
    phone_number = graphene.String()
    status = graphene.Boolean()
    is_admin = graphene.Boolean()
    reset_password = graphene.Boolean()
    auth2fa = graphene.Boolean()


class UserMetaDataInput(graphene.InputObjectType):
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)
    asset_group = graphene.String(required=True)
    phone_number = graphene.String(required=True)
    status = graphene.Boolean(default_value=True)
    is_admin = graphene.Boolean(default_value=False)
    reset_password = graphene.Boolean(default_value=False)
    auth2fa = graphene.Boolean(default_value=False)

class UpdateUserMetaDataInput(graphene.InputObjectType):
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)
    asset_group = graphene.String(required=True)
    phone_number = graphene.String(required=True)
    status = graphene.Boolean()
    is_admin = graphene.Boolean()
    reset_password = graphene.Boolean()
    auth2fa = graphene.Boolean()


class UserObject(graphene.ObjectType):
    user_id = graphene.String()
    email = graphene.String(required=True)
    user_metadata = graphene.Field(UserMetaData)


class UserInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String(required=True)
    user_metadata = graphene.Field(UserMetaDataInput)


class UpdateUserObject(graphene.ObjectType):
    user_metadata = graphene.Field(UserMetaData)


class UpdateUserInput(graphene.InputObjectType):
    user_metadata = graphene.InputField(UpdateUserMetaDataInput)


class AddUser(graphene.Mutation):
    class Input:
        user = UserInput()
        
    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.Field(UserObject)

    @login_required
    def mutate(self, info, user):
        meta_data = user["user_metadata"]
        url = f"https://{domain}/api/v2/users"
        headers = {
            'content-type': "application/json",
            'authorization': f"Bearer {get_mgt_token()}",
            'cache-control': "no-cache"
        }

        payload = {
            "email": user["email"],
            "password": user["password"],
            "user_metadata": {
                "first_name": meta_data["first_name"],
                "last_name": meta_data["last_name"],
                "asset_group": meta_data["asset_group"],
                "phone_number": meta_data["phone_number"],
                "status": meta_data["status"],
                "reset_password": meta_data["reset_password"],
                "is_admin": meta_data["is_admin"],
                "auth2fa": meta_data["auth2fa"]
            },
            "app_metadata": {},
            "connection": connection_name
        }

        response = requests.post(
            url,
            json.dumps(payload),
            headers=headers
        )
        if response.status_code == 201:
            ok = True
            message = 'User Created Successfully'
            data = response.json()
        else:
            ok = False
            message = response.json()['message'] or response.json()['error']
            data = None
        return AddUser(ok=ok, message=message, data=data)


class UpdateUser(graphene.Mutation):
    class Input:
        user_id = graphene.String(required=True)
        meta_data = UpdateUserInput()

    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.Field(UpdateUserObject)

    @login_required
    def mutate(self, info, user_id, meta_data):
        url = f"https://{domain}/api/v2/users/{user_id}"
        headers = {
            'content-type': "application/json",
            'authorization': f"Bearer {get_mgt_token()}",
            'cache-control': "no-cache"
        }

        payload = {
            "user_metadata": meta_data["user_metadata"],
            "app_metadata": {},
            "connection": "Username-Password-Authentication"
        }

        response = requests.patch (
            url,
            json.dumps(payload),
            headers=headers
        )
        if response.status_code == 200:
            ok = True
            message = 'User successfully updated'
            data = response.json()
        else:
            ok = False
            message = response.json()['message'] or response.json()['error']
            data = None
        return UpdateUser(ok=ok, message=message, data=data)
 

class DeleteUser(graphene.Mutation):
    ok = graphene.Boolean()
    message = graphene.String()
    
    class Arguments:
         user_id = graphene.String(required=True)

    @login_required
    def mutate(self, info, user_id):
        url = f"https://{domain}/api/v2/users/{user_id}"
        headers = {
            'content-type': "application/json",
            'authorization': f"Bearer {get_mgt_token()}",
            'cache-control': "no-cache"
        }

        response = requests.delete(
            url,
            headers=headers
        )
        if response.status_code == 204:
            ok = True
            message = 'User successfully deleted'
        else:
            ok = False
            message = response.json()['message'] or response.json()['error']
        return DeleteUser(ok=ok, message=message)
