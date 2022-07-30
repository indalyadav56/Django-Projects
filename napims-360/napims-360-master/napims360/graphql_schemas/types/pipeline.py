from graphene_django import DjangoObjectType
from napims360.helpers.mutation import SerializerMutation
from napims360.apps.asset_management.models import Pipeline
from napims360.apps.asset_management.serializers import PipelineSerializer

class PipelineType(DjangoObjectType):
    class Meta:
        model = Pipeline
        fields = '__all__'

class PipelineSerializerMutation(SerializerMutation):
    class Meta:
        serializer_class = PipelineSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }