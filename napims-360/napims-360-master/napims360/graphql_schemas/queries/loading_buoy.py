import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import LoadingBuoy
from napims360.graphql_schemas.types.loading_buoy import LoadingBuoySerializerMutation, LoadingBuoyType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query


class LoadingBuoyPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(LoadingBuoyType)

class LoadingBuoyQueries(ObjectType):
    loading_buoy = Field(LoadingBuoyPaginatedType,
                        page=graphene.Int(),
                        sort_by=graphene.String(),
                        is_asc=graphene.Boolean(),
                        search=graphene.String()
                    )
    loading_buoy_by_id = Field(LoadingBuoyType, id=String())

    @login_required
    def resolve_loading_buoy(self, info,page,**kwargs):
        page_size = 10
        query = LoadingBuoy.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("name", "terminal")
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, LoadingBuoyPaginatedType)
        return query 
       
    @login_required
    def resolve_loading_buoy_by_id(self, info, id):
        return LoadingBuoy.objects.get(pk=id)


class LoadingBuoyMutations(ObjectType):
    createLoadingBuoy = LoadingBuoySerializerMutation.CreateField()
    deleteLoadingBuoy = LoadingBuoySerializerMutation.DeleteField()
    updateLoadingBuoy = LoadingBuoySerializerMutation.UpdateField()
