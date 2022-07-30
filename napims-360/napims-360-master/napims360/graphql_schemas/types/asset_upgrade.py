from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import AssetUpgrade
from napims360.apps.asset_management.serializers import AssetUpgradeSerializer


class AssetUpgradeType(DjangoObjectType):
    class Meta:
        model = AssetUpgrade
        fields = '__all__'


class AssetUpgradeSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = AssetUpgradeSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }
