
import graphene
from graphene import Field, List, String, ObjectType

from napims360.apps.asset_management.models import AssetGroup
from napims360.graphql_schemas.types.asset_group import AssetGroupSerializerMutation, AssetGroupType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query


class AssetGroupPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(AssetGroupType)


class AssetGroupQueries(ObjectType):
    asset_group = Field(AssetGroupPaginatedType,
                        page=graphene.Int(),
                        sort_by=graphene.String(),
                        is_asc=graphene.Boolean(),
                        search=graphene.String()
                        )
    asset_group_by_id = Field(AssetGroupType, id=String())

    @login_required
    def resolve_asset_group(self, info,page,**kwargs): 
        page_size = 10
        query = AssetGroup.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("name",)
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        query = get_paginator(query, page_size, page, AssetGroupPaginatedType)
        return query 

    @login_required
    def resolve_asset_group_by_id(self, info, id):
        return AssetGroup.objects.get(pk=id)

class AssetGroupMutations(ObjectType):
    createAssetGroup = AssetGroupSerializerMutation.CreateField()
    deleteAssetGroup = AssetGroupSerializerMutation.DeleteField()
    updateAssetGroup = AssetGroupSerializerMutation.UpdateField()
