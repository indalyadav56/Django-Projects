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


class PermissionInput(graphene.InputObjectType):
    value = graphene.String(required=True)
    description = graphene.String(required=False)


class PermissionObject(graphene.ObjectType):
    value = graphene.String(required=True)
    description = graphene.String(required=False)


class AddPermission(graphene.Mutation):
    class Arguments:
        permissions = graphene.List(PermissionInput, required=True)

    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.List(PermissionObject)

    @login_required
    def mutate(self, info, permissions):
        url = f"https://{domain}/api/v2/resource-servers/{api_id}"
        headers = {
            'content-type': "application/json",
            'authorization': f"Bearer {get_mgt_token()}",
            'cache-control': "no-cache"
        }

        old_scopes_response = requests.get(url, headers=headers)
        old_scopes = old_scopes_response.json()['scopes']

        scopes = permissions + old_scopes
        payload = {"scopes": scopes}

        response = requests.patch(
            url,
            json.dumps(payload),
            headers=headers
        )
        if response.status_code == 200:
            ok = True
            message = 'new permissions created'
            data = scopes
        else:
            ok = False
            message = response.json()['error']
            data = []
        return AddPermission(ok=ok, message=message, data=data)


class DeletePermission(graphene.Mutation):
    class Arguments:
        value = graphene.String(required=True)
        description = graphene.String(required=False)

    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.List(PermissionObject)

    @login_required
    def mutate(self, info, value, description):
        url = f"https://{domain}/api/v2/resource-servers/{api_id}"
        headers = {
            'content-type': "application/json",
            'authorization': f"Bearer {get_mgt_token()}",
            'cache-control': "no-cache"
        }

        old_scopes_response = requests.get(url, headers=headers)
        scopes = old_scopes_response.json()['scopes']

        scope_index = next((index for (index, d) in enumerate(scopes) if d["value"] == value), None)

        if scope_index is None:
            return DeletePermission(ok=False, message='permission does not exist', data=[])

        del scopes[scope_index]

        payload = {"scopes": scopes}

        response = requests.patch(
            url,
            json.dumps(payload),
            headers=headers
        )
        if response.status_code == 200:
            ok = True
            message = 'permission deleted successfully'
            data = scopes
        else:
            ok = False
            message = response.json()['error']
            data = []
        return DeletePermission(ok=ok, message=message, data=data)


class UpdatePermission(graphene.Mutation):
    class Arguments:
        value = graphene.String(required=True)
        new_value = graphene.String(required=True)
        new_description = graphene.String(required=True)

    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.List(PermissionObject)

    @login_required
    def mutate(self, info, value, new_value, new_description):
        url = f"https://{domain}/api/v2/resource-servers/{api_id}"
        headers = {
            'content-type': "application/json",
            'authorization': f"Bearer {get_mgt_token()}",
            'cache-control': "no-cache"
        }

        old_scopes_response = requests.get(url, headers=headers)
        scopes = old_scopes_response.json()['scopes']

        scope_index = next((index for (index, d) in enumerate(scopes) if d["value"] == value), None)

        if scope_index is None:
            return DeletePermission(ok=False, message='permission does not exist', data=[])

        scopes[scope_index] = {'value': new_value, 'description': new_description}

        payload = {"scopes": scopes}

        response = requests.patch(
            url,
            json.dumps(payload),
            headers=headers
        )
        if response.status_code == 200:
            ok = True
            message = 'permission updated successfully'
            data = scopes
        else:
            ok = False
            message = response.json()['error']
            data = []
        return DeletePermission(ok=ok, message=message, data=data)
