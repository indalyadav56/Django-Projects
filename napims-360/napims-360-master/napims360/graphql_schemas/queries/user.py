from django.conf import settings
from graphene import List, ObjectType
import graphene
from napims360.graphql_schemas.types.user import UserObject, AddUser, DeleteUser, UpdateUser
from napims360.apps.authentication.utils import get_mgt_token
import requests
from graphql_jwt.decorators import login_required
from django.conf import settings

domain = settings.AUTH0_DOMAIN
audience = settings.AUTH0_API_AUDIENCE
client_id = settings.AUTH0_CLIENT_ID
client_secret = settings.AUTH0_CLIENT_SECRET
connection_name = settings.AUTH0_CONNECTION_NAME
api_id = settings.AUTH0_API_ID

class UserPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(UserObject)

class UserQueries(ObjectType):
    users = graphene.Field(UserPaginatedType,
                           page=graphene.Int(),
                           search=graphene.String(),
                           roleId=graphene.String()
    )

    @login_required
    def resolve_users(self, info, search=None, roleId=None, page=None, **kwargs):
        page_size = settings.GRAPHENE.get("PAGE_SIZE", 10)
        if page:
            page -= 1
        else:
            page = 0
        if search:
            url = f"https://{settings.AUTH0_DOMAIN}/api/v2/users?\
            q=(email:{search} OR user_metadata.first_name:{search} OR user_metadata.last_name:{search})\
            &page={page}&per_page={page_size}&include_totals=true"
        elif roleId:
            url = f"https://{settings.AUTH0_DOMAIN}/api/v2/roles/{roleId}/users?\
            page={page}&per_page={page_size}&include_totals=true"
        else:
            url = f"https://{settings.AUTH0_DOMAIN}/api/v2/users?\
            page={page}&per_page={page_size}&include_totals=true"
        headers = {
            'content-type': "application/json",
            'authorization': f"Bearer {get_mgt_token()}",
            'cache-control': "no-cache"
        }
        response = requests.get(
            url,
            headers=headers
        )
        data = response.json()
        print(data)
        result = {
            "total": data['total'],
            "size": data['length'],
            "current": page,
            "has_next": (data['start'] + data['length']) < data['total'],
            "has_prev": (data['start'] - data['length']) > 0,
            "results": data['users']
        }
        return result


class UserMutations(ObjectType):
    create_user = AddUser.Field()
    delete_user = DeleteUser.Field()
    update_user = UpdateUser.Field()
