import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import AGG
from napims360.graphql_schemas.types.agg import AGGSerializerMutation, AGGType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class AGGPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(AGGType)


class AGGQueries(ObjectType):
    agg = Field(AGGPaginatedType,
                page=graphene.Int(),
                sort_by=graphene.String(),
                is_asc=graphene.Boolean(),
                search=graphene.String()
                     )
    agg_by_id = Field(AGGType, id=String())

    @login_required
    def resolve_agg(self, info, page, **kwargs):
        page_size = 10
        query = AGG.objects.all()
        if kwargs.get("search", None):
            qs = kwargs["search"]
            search_fields = ("capacity", "agg_type", "specification", "date_commissioned", "gas_capacity",)
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, AGGPaginatedType)
        return query

    @login_required
    def resolve_agg_by_id(self, info, id):
        return AGG.objects.get(pk=id)

class AGGMutations(ObjectType):
    createAGG = AGGSerializerMutation.CreateField()
    deleteAGG = AGGSerializerMutation.DeleteField()
    updateAGG = AGGSerializerMutation.UpdateField()