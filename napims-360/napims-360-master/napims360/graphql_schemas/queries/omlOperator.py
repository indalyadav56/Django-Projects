import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import OmlOperator
from napims360.graphql_schemas.types.omlOperator import OmlOperatorType, OmlOperatorSerializerMutation
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class OmlOperatorPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(OmlOperatorType) 

class OmlOperatorQueries(ObjectType):
    oml_operator = Field(OmlOperatorPaginatedType,
                        page=graphene.Int(),
                        sort_by=graphene.String(),
                        is_asc=graphene.Boolean(),
                        search=graphene.String()
                        )
    oml_operator_by_id = Field(OmlOperatorType, id=String())

    @login_required
    def resolve_oml_operator(self,info,page,**kwargs):
        page_size = 10
        query = OmlOperator.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("company", "award_date", "expiry_date", "contract_type", "contract_status")
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, OmlOperatorPaginatedType)
        return query
    
    @login_required
    def resolve_oml_operator_by_id(self, info, id):
        return OmlOperator.objects.get(pk=id)

class OmlOperatorMutations(ObjectType):
    createOmlOperator = OmlOperatorSerializerMutation.CreateField()
    deleteOmlOperator = OmlOperatorSerializerMutation.DeleteField()
    updateOmlOperator = OmlOperatorSerializerMutation.UpdateField()
