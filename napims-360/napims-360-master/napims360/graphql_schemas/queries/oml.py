import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import Oml
from napims360.graphql_schemas.types.oml import OmlType, OmlSerializerMutation
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class OmlPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(OmlType) 

class OmlQueries(ObjectType):
    oml = Field(OmlPaginatedType,
               page=graphene.Int(),
               sort_by=graphene.String(),
               is_asc=graphene.Boolean(),
               search=graphene.String()
               )
    oml_by_id = Field(OmlType, id=String())

    @login_required
    def resolve_oml(self,info, page, **kwargs):
        page_size = 10
        query = Oml.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("area", "country", "state", "basin_name", "document_number", "application_date" )
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, OmlPaginatedType)
        return query
        # return Oml.objects.all()
        
    @login_required
    def resolve_oml_by_id(self, info, id):
        return Oml.objects.get(pk=id)

class OmlMutations(ObjectType):
    createOml = OmlSerializerMutation.CreateField()
    deleteOml = OmlSerializerMutation.DeleteField()
    updateOml = OmlSerializerMutation.UpdateField()
