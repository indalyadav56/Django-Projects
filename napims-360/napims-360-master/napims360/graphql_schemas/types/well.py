from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import Well
from napims360.apps.asset_management.serializers import WellSerializer

class WellType(DjangoObjectType):
    class Meta:
        model = Well
        fields = '__all__'

class WellSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = WellSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }