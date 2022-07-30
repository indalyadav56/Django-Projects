from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import OilField
from napims360.apps.asset_management.serializers import OilFieldSerializer


class OilFieldType(DjangoObjectType):
    class Meta:
        model = OilField
        fields = '__all__'


class OilFieldSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = OilFieldSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }
