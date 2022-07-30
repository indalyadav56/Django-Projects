from graphene import List, ObjectType
import graphene

from napims360.graphql_schemas.types.roles import RolesObject, CreateRoles, DeleteRoles, UpdateRoles
from napims360.graphql_schemas.types.roles import AssignRolesObject, AssignRoles, RemoveRoles
from napims360.apps.authentication.utils import get_role
from graphql_jwt.decorators import login_required


class RolesQueries(ObjectType):
    roles = List(RolesObject, id=graphene.String())
    assign_roles = List(AssignRolesObject, userId=graphene.String())

    @login_required
    def resolve_roles(self, info, id=None, **kwargs):
        return get_role(id)
        
    @login_required
    def resolve_assign_roles(self, info, userId=None, **kwargs):
        return get_role(userId=userId)


class RolesMutation(ObjectType):
    create_roles = CreateRoles.Field()
    delete_roles = DeleteRoles.Field()
    update_roles = UpdateRoles.Field()
    assign_roles = AssignRoles.Field()
    remove_roles = RemoveRoles.Field()
