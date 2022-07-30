import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import Station
from napims360.graphql_schemas.types.station import StationSerializerMutation, StationType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class StationPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(StationType) 
    
class StationQueries(ObjectType):
    platform = Field(StationPaginatedType,
                     page=graphene.Int(),
                     sort_by=graphene.String(),
                     is_asc=graphene.Boolean(),
                     search=graphene.String()
                    )
    
    platform_by_id = Field(StationType, id=String())
    
    station = Field(StationPaginatedType,
                     page=graphene.Int(),
                     sort_by=graphene.String(),
                     is_asc=graphene.Boolean(),
                     search=graphene.String()
                    )
                    
    station_by_id = Field(StationType, id=String())
    
    @login_required
    def resolve_platform(self, info, page,**kwargs):
        page_size = 10
        query = Station.objects.filter(station_type="platform")
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("gas_capacity", "terminal", "gross_liquid_capacity","station_type","terrain" )
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, StationPaginatedType)
        return query
    
    @login_required
    def resolve_platform_by_id(self, info, id):
        return Station.objects.get(pk=id)
    
    @login_required
    def resolve_station(self, info, page,**kwargs):
        page_size = 10
        query = Station.objects.filter(station_type="flowstation")
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("gas_capacity", "terminal", "gross_liquid_capacity","station_type","terrain" )
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, StationPaginatedType)
        return query
    
    @login_required
    def resolve_station_by_id(self, info, id):
        return Station.objects.get(pk=id)

class StationMutations(ObjectType):
    createStation = StationSerializerMutation.CreateField()
    deleteStation = StationSerializerMutation.DeleteField()
    updateStation = StationSerializerMutation.UpdateField()