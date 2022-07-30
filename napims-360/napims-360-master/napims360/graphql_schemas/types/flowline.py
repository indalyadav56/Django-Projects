from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import Flowline
from napims360.apps.asset_management.serializers import FlowlineSerializer

class FlowlineType(DjangoObjectType):
    class Meta:
        model = Flowline
        fields = '__all__'

class FlowlineSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = FlowlineSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        } 