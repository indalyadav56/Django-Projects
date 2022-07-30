import graphene
from graphene import ObjectType, Field, String, List
from napims360.apps.asset_management.models import OilField
from napims360.graphql_schemas.types.oil_field import OilFieldType, OilFieldSerializerMutation
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class OilFieldPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(OilFieldType) 

class OilFieldQueries(ObjectType):
    oil_field = Field(OilFieldPaginatedType,page=graphene.Int(),sort_by=graphene.String(),is_asc=graphene.Boolean(), search=graphene.String())
    oil_field_by_id = Field(OilFieldType, id=String())

    @login_required
    def resolve_oil_field(self, info,page,**kwargs):
        page_size = 10
        query = OilField.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("location", "date_discovered", "date_drilled", "oil_ultimate_recovery","data_of_exploration_completion", "reservoir_description" )
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page,OilFieldPaginatedType)
        return query 

    @login_required
    def resolve_oil_field_by_id(self, info, id):
        return OilField.objects.get(pk=id)


class OilFieldMutations(ObjectType):
    createOilField = OilFieldSerializerMutation.CreateField()
    updateOilField = OilFieldSerializerMutation.UpdateField()
    deleteOilField = OilFieldSerializerMutation.DeleteField()
