from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import LoadingBuoy
from napims360.apps.asset_management.serializers import LoadingBuoySerializer


class LoadingBuoyType(DjangoObjectType):
    class Meta:
        model = LoadingBuoy
        fields = '__all__'


class LoadingBuoySerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = LoadingBuoySerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }
