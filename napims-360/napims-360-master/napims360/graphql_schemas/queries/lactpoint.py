import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import LactPoint
from napims360.graphql_schemas.types.lactpoint import LactPointSerializerMutation, LactPointType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class LactPointPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(LactPointType)

class LactPointQueries(ObjectType):
    lactpoint = Field(LactPointPaginatedType, 
                     page=graphene.Int(),
                     sort_by=graphene.String(),
                     is_asc=graphene.Boolean(),
                     search=graphene.String())
    lactpoint_by_id = Field(LactPointType, id=String())

    @login_required
    def resolve_lactpoint(self, info, page, **kwargs):
        page_size = 10
        query = LactPoint.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("lact_name", "average_volume", "lact_sn" )
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, LactPointPaginatedType)
        return query 
    
    @login_required
    def resolve_lactpoint_by_id(self, info, id):
        return LactPoint.objects.get(pk=id)

class LactPointMutations(ObjectType):
    createLactPoint = LactPointSerializerMutation.CreateField()
    deleteLactPoint = LactPointSerializerMutation.DeleteField()
    updateLactPoint = LactPointSerializerMutation.UpdateField()