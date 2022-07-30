from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import Station
from napims360.apps.asset_management.serializers import StationSerializer

class StationType(DjangoObjectType):
    class Meta:
        model = Station
        fields = '__all__'

class StationSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = StationSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        } 