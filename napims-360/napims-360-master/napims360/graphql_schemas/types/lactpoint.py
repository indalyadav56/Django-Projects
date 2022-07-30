from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import LactPoint
from napims360.apps.asset_management.serializers import LactPointSerializer


class LactPointType(DjangoObjectType):
    class Meta:
        model = LactPoint
        fields = '__all__'


class LactPointSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = LactPointSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }
