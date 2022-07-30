import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import Reservoir
from napims360.graphql_schemas.types.reservoir import ReservoirType, ReservoirSerializerMutation
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class ReservoirPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(ReservoirType) 

class ReservoirQueries(ObjectType):
    reservoir = Field(ReservoirPaginatedType,
                     page=graphene.Int(),
                     sort_by=graphene.String(),
                     is_asc=graphene.Boolean(),
                     search=graphene.String()
                     )
    reservoir_by_id = Field(ReservoirType, id=String())

    @login_required
    def resolve_reservoir(self,info,page,**kwargs):
        page_size = 10
        query = Reservoir.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("name", "reservoir_type", "compartment","oil_field" )
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, ReservoirPaginatedType)
        return query 
        
    @login_required
    def resolve_reservoir_by_id(self, info, id):
        return Reservoir.objects.get(pk=id)

class ReservoirMutations(ObjectType):
    createReservoir = ReservoirSerializerMutation.CreateField()
    deleteReservoir = ReservoirSerializerMutation.DeleteField()
    updateReservoir = ReservoirSerializerMutation.UpdateField()
