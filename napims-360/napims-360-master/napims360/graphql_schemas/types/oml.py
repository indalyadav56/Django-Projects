from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import Oml
from napims360.apps.asset_management.serializers import OmlSerializer

class OmlType(DjangoObjectType):
    class Meta:
        model = Oml
        fields = '__all__'

class  OmlSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = OmlSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }
