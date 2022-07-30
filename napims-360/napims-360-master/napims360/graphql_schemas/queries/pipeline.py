import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import Pipeline
from napims360.graphql_schemas.types.pipeline import PipelineSerializerMutation, PipelineType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class PipelinePaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(PipelineType) 

class PipelineQueries(ObjectType):
    pipeline = Field(PipelinePaginatedType,
                     page=graphene.Int(),
                     sort_by=graphene.String(),
                     is_asc=graphene.Boolean(),
                     search=graphene.String()
                     )
    pipeline_by_id = Field(PipelineType, id=String())

    @login_required
    def resolve_pipeline(self, info,page,**kwargs):
        page_size = 10
        query = Pipeline.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("name", "location", "gas_capacity","availability","date_completed")
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, PipelinePaginatedType)
        return query 
       
    @login_required
    def resolve_pipeline_by_id(self, info, id):
        return Pipeline.objects.get(pk=id)

class PipelineMutations(ObjectType):
    createPipeline = PipelineSerializerMutation.CreateField()
    deletePipeline = PipelineSerializerMutation.DeleteField()
    updatePipeline = PipelineSerializerMutation.UpdateField()