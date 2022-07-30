from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import AGG
from napims360.apps.asset_management.serializers import AGGSerializer

class AGGType(DjangoObjectType):
    class Meta:
        model = AGG
        fields = '__all__'

class AGGSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = AGGSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }