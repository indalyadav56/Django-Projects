from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import Manifold
from napims360.apps.asset_management.serializers import ManifoldSerializer

class ManifoldType(DjangoObjectType):
    class Meta:
        model = Manifold
        fields = '__all__'

class ManifoldSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = ManifoldSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }