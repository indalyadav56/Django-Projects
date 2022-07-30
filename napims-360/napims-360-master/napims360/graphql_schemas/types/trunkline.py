from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import Trunkline
from napims360.apps.asset_management.serializers import TrunklineSerializer

class TrunklineType(DjangoObjectType):
    class Meta:
        model = Trunkline
        fields = '__all__'

class TrunklineSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = TrunklineSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        } 