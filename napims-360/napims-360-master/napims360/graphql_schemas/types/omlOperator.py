from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import OmlOperator
from napims360.apps.asset_management.serializers import OmlOperatorSerializer

class OmlOperatorType(DjangoObjectType):
    class Meta:
        model = OmlOperator
        fields = '__all__'

class  OmlOperatorSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = OmlOperatorSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }
