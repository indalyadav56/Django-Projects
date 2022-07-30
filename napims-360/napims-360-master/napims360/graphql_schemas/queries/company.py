from re import search
import graphene
from graphene import Field, List, String, ObjectType

from napims360.apps.asset_management.models import Company
from napims360.graphql_schemas.types.company import CompanySerializerMutation, CompanyType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class CompanyPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(CompanyType)

class CompanyQueries(ObjectType):
    company = Field(CompanyPaginatedType,
                    page=graphene.Int(),
                    sort_by=graphene.String(),
                    is_asc=graphene.Boolean(),
                    search=graphene.String()
                    )       
    company_by_id = Field(CompanyType, id=String())

    @login_required
    def resolve_company(self, info, page,**kwargs):
        page_size = 10
        query =  Company.objects.all()
        if kwargs.get("search", None):
            qs = kwargs["search"]
            search_fields = ("name",)
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
            qs = kwargs["sort_by"]
            is_asc = kwargs.get("is_asc", False)
            if not is_asc:
                qs = f"-{qs}"
            query = query.order_by(qs)
            
        query = get_paginator(query, page_size, page, CompanyPaginatedType) 
        return query
       
    @login_required
    def resolve_company_by_id(self, info, id):
        return Company.objects.get(pk=id)

class CompanyMutations(ObjectType):
    createCompany = CompanySerializerMutation.CreateField()
    deleteCompany = CompanySerializerMutation.DeleteField()
    updateCompany = CompanySerializerMutation.UpdateField()
