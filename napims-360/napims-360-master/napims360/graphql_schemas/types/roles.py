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


class RolesInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    description = graphene.String(required=False)


class RolesObject(graphene.ObjectType):
    id = graphene.String(required=False)
    name = graphene.String(required=True)
    description = graphene.String(required=False)


class  AssignRolesInput(graphene.InputObjectType):
    roleId = graphene.String(required=True)


class AssignRolesObject(graphene.ObjectType):
    id = graphene.String(required=False)
    name = graphene.String(required=True)


class CreateRoles(graphene.Mutation):
    class Arguments:
        roles = graphene.List(RolesInput, required=True)

    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.List(RolesObject)

    @login_required
    def mutate(self, info, roles):
        url = f"https://{domain}/api/v2/roles"
        headers = {
            'content-type': "application/json",
            'authorization': f"Bearer {get_mgt_token()}",
            'cache-control': "no-cache"
        }

        # old_scopes_response = requests.get(url, headers=headers)
        # old_scopes = old_scopes_response.json()['scopes']
    
        scopes = roles 
        payload = {"scopes": scopes}
        response = requests.post(
            url,
            json.dumps(payload),
            headers=headers
        )
        if response.status_code == 200:
            ok = True
            message = 'Role successfully created'
            data = roles
        else:
            ok = False
            message = response.json()['error']
            data = []
        return CreateRoles(ok=ok, message=message, data=data)


class DeleteRoles(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String(required=False)

    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.List(RolesObject)

    @login_required
    def mutate(self, info, name, description):
        url = f"https://{domain}/api/v2/roles/{id}"
        headers = {
            'content-type': "application/json",
            'authorization': f"Bearer {get_mgt_token()}",
            'cache-control': "no-cache"
        }

        old_scopes_response = requests.get(url, headers=headers)
        roles = old_scopes_response.json()['scopes']

        roles_index = next((index for (index, d) in enumerate(roles) if d["name"] == name), None)

        if roles_index is None:
            return DeleteRoles(ok=False, message='roles does not exist', data=[])

        del roles[roles_index]

        payload = {"delete": roles}

        response = requests.delete(
            url,
            json.dumps(payload),
            headers=headers
        )
        if response.status_code == 204:
            ok = True
            message = 'Role successfully deleted'
            data = roles
        else:
            ok = False
            message = response.json()['error']
            data = []
        return DeleteRoles(ok=ok, message=message, data=data)


class UpdateRoles(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        new_name = graphene.String(required=True)
        new_description = graphene.String(required=True)

    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.List(RolesObject)

    @login_required
    def mutate(self, info, name, new_name, new_description):
        url = f"https://{domain}//api/v2/roles/{id}"
        headers = {
            'content-type': "application/json",
            'authorization': f"Bearer {get_mgt_token()}",
            'cache-control': "no-cache"
        }

        old_scopes_response = requests.get(url, headers=headers)
        roles = old_scopes_response.json()['scopes']

        roles_index = next((index for (index, d) in enumerate(roles) if d["name"] == name), None)

        if roles_index is None:
            return UpdateRoles(ok=False, message='roles does not exist', data=[])

        roles[roles_index] = {'name': new_name, 'description': new_description}

        payload = {"update": roles}

        response = requests.patch(
            url,
            json.dumps(payload),
            headers=headers
        )
        if response.status_code == 200:
            ok = True
            message = 'Role successfully updated'
            data = roles
        else:
            ok = False
            message = response.json()['error']
            data = []
        return UpdateRoles(ok=ok, message=message, data=data)


class AssignRoles(graphene.Mutation):
    class Arguments:
        userId = graphene.String(required=True)
        assign_roles = graphene.List(AssignRolesInput, required=True)

    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.List(AssignRolesObject)

    @login_required
    def mutate(self, info, userId, assign_roles):
        url = f"https://{domain}/api/v2/users/{userId}/roles"
        headers = {
            'content-type': "application/json",
            'authorization': f"Bearer {get_mgt_token()}",
            'cache-control': "no-cache"
        }

        scopes = assign_roles 
        payload = {"scopes": scopes}

        response = requests.post(
            url,
            json.dumps(payload),
            headers=headers
        )
        if response.status_code == 204:
            ok = True
            message = 'Roles successfully associated with user'
            data = scopes
        else:
            ok = False
            message = response.json()['error']
            data = []
        return AssignRoles(ok=ok, message=message, data=data)


class RemoveRoles(graphene.Mutation):
    class Arguments:
        userId = graphene.String(required=True)
        delete_roles = graphene.List(AssignRolesInput, required=True)

    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.List(AssignRolesObject)

    @login_required
    def mutate(self, info, userId, delete_roles):
        url = f"https://{domain}/api/v2/users/{userId}/roles"
        headers = {
            'content-type': "application/json",
            'authorization': f"Bearer {get_mgt_token()}",
            'cache-control': "no-cache"
        }

        scopes = delete_roles 
        payload = {"scopes": scopes}

        response = requests.delete(
            url,
            json.dumps(payload),
            headers=headers
        )
        if response.status_code == 204:
            ok = True
            message = 'Users roles successfully removed'
            data = scopes
        else:
            ok = False
            message = response.json()['error']
            data = []
        return RemoveRoles(ok=ok, message=message, data=data)