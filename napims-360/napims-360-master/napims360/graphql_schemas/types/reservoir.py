from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import Reservoir
from napims360.apps.asset_management.serializers import ReservoirSerializer

class ReservoirType(DjangoObjectType):
    class Meta:
        model = Reservoir
        fields = '__all__'

class  ReservoirSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = ReservoirSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }
