from graphene_django import DjangoObjectType

from napims360.helpers.type import ExtendedConnection
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import Company
from napims360.apps.asset_management.serializers import CompanySerializer

class CompanyType(DjangoObjectType):
    class Meta:
        model = Company
        fields = '__all__'

class CompanySerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = CompanySerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }