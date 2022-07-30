import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import Flowline
from napims360.graphql_schemas.types.flowline import FlowlineSerializerMutation, FlowlineType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class FlowlinePaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(FlowlineType)

class FlowlineQueries(ObjectType):
    flowline = Field(FlowlinePaginatedType, page=graphene.Int(), search=graphene.String())
    flowline_by_id = Field(FlowlineType, id=String())

    @login_required
    def resolve_flowline(self, info, page, **kwargs):
        page_size = 10
        query = Flowline.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("name", "capacity", "location", "date_commissioned", "date_completed", "flowline_type" )
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        query = get_paginator(query, page_size, page, FlowlinePaginatedType)
        return query 
        
    @login_required
    def resolve_flowline_by_id(self, info, id):
        return Flowline.objects.get(pk=id)

class FlowlineMutations(ObjectType):
    createFlowline = FlowlineSerializerMutation.CreateField()
    deleteFlowline = FlowlineSerializerMutation.DeleteField()
    updateFlowline = FlowlineSerializerMutation.UpdateField()