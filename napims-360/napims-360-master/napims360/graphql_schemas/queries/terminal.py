import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import Terminal
from napims360.graphql_schemas.types.terminal import TerminalSerializerMutation, TerminalType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class TerminalPaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(TerminalType) 
    
class TerminalQueries(ObjectType):
    terminal = Field(TerminalPaginatedType,
                     page=graphene.Int(),
                     sort_by=graphene.String(),
                     is_asc=graphene.Boolean(),
                     search=graphene.String()
                    )
    terminal_by_id = Field(TerminalType, id=String())

    fso = Field(TerminalPaginatedType,
                     page=graphene.Int(),
                     sort_by=graphene.String(),
                     is_asc=graphene.Boolean(),
                     search=graphene.String()
                    )
    
    fso_by_id = Field(TerminalType, id=String())

    fpso = Field(TerminalPaginatedType,
                     page=graphene.Int(),
                     sort_by=graphene.String(),
                     is_asc=graphene.Boolean(),
                     search=graphene.String()
                    )
    
    fpso_by_id = Field(TerminalType, id=String())

    @login_required
    def resolve_terminal(self, info,page,**kwargs):
        page_size = 10
        query = Terminal.objects.filter(terminal_type='general')
        if kwargs.get("search", None):
            qs = kwargs["search"]
            search_fields = ("location", "terminal_type", "loadout_facility","storage_tank_capacity","gas_capacity")
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, TerminalPaginatedType)
        return query

    @login_required
    def resolve_terminal_by_id(self, info, id):
        return Terminal.objects.get(pk=id)
    
    @login_required
    def resolve_fso(self, info,page,**kwargs):
        page_size = 10
        query = Terminal.objects.filter(terminal_type='fso')
        if kwargs.get("search", None):
            qs = kwargs["search"]
            search_fields = ("location", "terminal_type", "loadout_facility","storage_tank_capacity","gas_capacity")
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, TerminalPaginatedType)
        return query
    
    @login_required
    def resolve_fso_by_id(self, info, id):
        return Terminal.objects.get(pk=id)
    
    @login_required
    def resolve_fpso(self, info,page,**kwargs):
        page_size = 10
        query = Terminal.objects.filter(terminal_type='fpso')
        if kwargs.get("search", None):
            qs = kwargs["search"]
            search_fields = ("location", "terminal_type", "loadout_facility","storage_tank_capacity","gas_capacity")
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
        if kwargs.get("sort_by", None):
                qs = kwargs["sort_by"]
                is_asc = kwargs.get("is_asc", False)
                if not is_asc:
                 qs = f"-{qs}"
                query = query.order_by(qs)
        query = get_paginator(query, page_size, page, TerminalPaginatedType)
        return query
    
    @login_required
    def resolve_fpso_by_id(self, info, id):
        return Terminal.objects.get(pk=id)


class TerminalMutations(ObjectType):
    createTerminal = TerminalSerializerMutation.CreateField()
    deleteTerminal = TerminalSerializerMutation.DeleteField()
    updateTerminal = TerminalSerializerMutation.UpdateField()
