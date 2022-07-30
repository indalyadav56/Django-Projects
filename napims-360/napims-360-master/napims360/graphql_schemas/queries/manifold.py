import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import Manifold
from napims360.graphql_schemas.types.manifold import ManifoldSerializerMutation, ManifoldType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class ManifoldPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(ManifoldType) 

class ManifoldQueries(ObjectType):
    manifold = Field(ManifoldPaginatedType,page=graphene.Int(),sort_by=graphene.String(),is_asc=graphene.Boolean(), search=graphene.String())
    manifold_by_id = Field(ManifoldType, id=String())

    @login_required
    def resolve_manifold(self, info,page,**kwargs):
        page_size = 10
        query = Manifold.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("lat", "trunkline", "deliveryline" )
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, ManifoldPaginatedType)
        return query 
     
    @login_required
    def resolve_manifold_by_id(self, info, id):
        return Manifold.objects.get(pk=id)

class ManifoldMutations(ObjectType):
    createManifold = ManifoldSerializerMutation.CreateField()
    deleteManifold = ManifoldSerializerMutation.DeleteField()
    updateManifold = ManifoldSerializerMutation.UpdateField()