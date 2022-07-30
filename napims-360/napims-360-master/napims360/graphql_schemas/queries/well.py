import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import Well
from napims360.graphql_schemas.types.well import WellSerializerMutation, WellType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class WellPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(WellType)  
  
class WellQueries(ObjectType):
    well = Field(WellPaginatedType,
                 page=graphene.Int(),
                 sort_by=graphene.String(),
                 is_asc=graphene.Boolean(),
                 search=graphene.String()
                     )
    well_by_id = Field(WellType, id=String())

    @login_required
    def resolve_well(self, info, page, **kwargs):
        page_size = 10
        query = Well.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("name", "rig_name", "rig_type","flowline","well_type")
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, WellPaginatedType)
        return query
    
    @login_required
    def resolve_well_by_id(self, info, id):
        return Well.objects.get(pk=id)

class WellMutations(ObjectType):
    createWell = WellSerializerMutation.CreateField()
    deleteWell = WellSerializerMutation.DeleteField()
    updateWell = WellSerializerMutation.UpdateField()