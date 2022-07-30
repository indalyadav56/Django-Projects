import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import Trunkline
from napims360.graphql_schemas.types.trunkline import TrunklineSerializerMutation, TrunklineType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class TrunklinePaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(TrunklineType)  
    
class TrunklineQueries(ObjectType):
    trunkline = Field(TrunklinePaginatedType,
                     page=graphene.Int(),
                     sort_by=graphene.String(),
                     is_asc=graphene.Boolean(),
                     search=graphene.String()
                     )
    trunkline_by_id = Field(TrunklineType, id=String())

    @login_required
    def resolve_trunkline(self, info, page,**kwargs):
        page_size = 10
        query = Trunkline.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("name", "terminal", "location","gas_capacity","date_completed","date_commissioned" )
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page,TrunklinePaginatedType)
        return query 
     
    @login_required
    def resolve_trunkline_by_id(self, info, id):
        return Trunkline.objects.get(pk=id)

class TrunklineMutations(ObjectType):
    createTrunkline = TrunklineSerializerMutation.CreateField()
    deleteTrunkline = TrunklineSerializerMutation.DeleteField()
    updateTrunkline = TrunklineSerializerMutation.UpdateField()