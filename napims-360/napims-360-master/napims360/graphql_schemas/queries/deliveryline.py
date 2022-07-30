import graphene
from graphene import Field, List, String, ObjectType
from napims360.apps.asset_management.models import DeliveryLine
from napims360.graphql_schemas.types.deliveryline import DeliveryLineSerializerMutation, DeliveryLineType
from graphql_jwt.decorators import login_required
from napims360.lib.pagination import get_paginator, get_query

class DeliveryLinePaginatedType(graphene.ObjectType):
    total = graphene.Int()
    size = graphene.Int()
    current = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    results = graphene.List(DeliveryLineType)
    
class DeliveryLineQueries(ObjectType):
    deliveryline = Field(DeliveryLinePaginatedType, page=graphene.Int(), search=graphene.String())
    deliveryline_by_id = Field(DeliveryLineType, id=String())

    @login_required
    def resolve_deliveryline(self, info, page, **kwargs):
        page_size = 10
        query = DeliveryLine.objects.all()
        if kwargs.get("search", None):
            qs= kwargs["search"]
            search_fields = ("capacity", "location", "flow_station","date_completed", "date_commissioned", "delivery_line_type" )
            search_data = get_query(qs, search_fields)
            query = query.filter(search_data)
            
        query = get_paginator(query, page_size, page, DeliveryLinePaginatedType)
        return query 
        
    
    @login_required
    def resolve_deliveryline_by_id(self, info, id):
        return DeliveryLine.objects.get(pk=id)

class DeliveryLineMutations(ObjectType):
    createDeliveryLine = DeliveryLineSerializerMutation.CreateField()
    deleteDeliveryLine = DeliveryLineSerializerMutation.DeleteField()
    updateDeliveryLine = DeliveryLineSerializerMutation.UpdateField()