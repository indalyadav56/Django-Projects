from graphene_django import DjangoObjectType

from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import AssetGroup
from napims360.apps.asset_management.serializers import AssetGroupSerializer

class AssetGroupType(DjangoObjectType):
    class Meta:
        model = AssetGroup
        fields = '__all__'

class AssetGroupSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = AssetGroupSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }