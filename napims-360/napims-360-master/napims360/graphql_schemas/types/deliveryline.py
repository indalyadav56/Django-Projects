from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import DeliveryLine
from napims360.apps.asset_management.serializers import DeliveryLineSerializer

class DeliveryLineType(DjangoObjectType):
    class Meta:
        model = DeliveryLine
        fields = '__all__'

class DeliveryLineSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = DeliveryLineSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }