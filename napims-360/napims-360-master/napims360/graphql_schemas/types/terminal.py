from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import Terminal
from napims360.apps.asset_management.serializers import TerminalSerializer

class TerminalType(DjangoObjectType):
    class Meta:
        model = Terminal
        fields = '__all__'

class TerminalSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = TerminalSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }