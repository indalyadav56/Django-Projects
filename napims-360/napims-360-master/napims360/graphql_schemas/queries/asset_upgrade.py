import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import AssetUpgrade
from napims360.graphql_schemas.types.asset_upgrade import AssetUpgradeSerializerMutation, AssetUpgradeType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class AssetUpgradePaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(AssetUpgradeType)
  
class AssetUpgradeQueries(ObjectType):
    asset_upgrade = Field(AssetUpgradePaginatedType,
                         page=graphene.Int(),
                         sort_by=graphene.String(),
                         is_asc=graphene.Boolean(), 
                         search=graphene.String()
                         )
    asset_upgrade_by_id = Field(AssetUpgradeType, id=String())

    @login_required
    def resolve_asset_upgrade(self, info,page,**kwargs):
        page_size = 10
        query = AssetUpgrade.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("asset_type",)
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page,AssetUpgradePaginatedType)
        return query
         
    @login_required
    def resolve_asset_upgrade_by_id(self, info, id):
        return AssetUpgrade.objects.get(pk=id)

class AssetUpgradeMutations(ObjectType):
    createAssetUpgrade = AssetUpgradeSerializerMutation.CreateField()
    deleteAssetUpgrade = AssetUpgradeSerializerMutation.DeleteField()
    updateAssetUpgrade = AssetUpgradeSerializerMutation.UpdateField()
