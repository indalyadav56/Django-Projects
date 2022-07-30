from graphene import List, ObjectType

from napims360.graphql_schemas.types.permissions import PermissionObject, AddPermission, DeletePermission, UpdatePermission
from napims360.apps.authentication.utils import get_permissions
from graphql_jwt.decorators import login_required


class PermissionQueries(ObjectType):
    permissions = List(PermissionObject)

    @login_required
    def resolve_permissions(self, info, **kwargs):
        return get_permissions()


class PermissionMutation(ObjectType):
    add_permission = AddPermission.Field()
    delete_permission = DeletePermission.Field()
    update_permission = UpdatePermission.Field()
