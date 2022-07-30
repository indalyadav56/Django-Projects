from napims360.lib.base_serializer import BaseSerializer
from napims360.apps.asset_management.models import *


class AssetGroupSerializer(BaseSerializer):
    class Meta:
        model = AssetGroup
        fields = '__all__'


class CompanySerializer(BaseSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class OmlSerializer(BaseSerializer):
    class Meta:
        model = Oml
        fields = '__all__'


class OilFieldSerializer(BaseSerializer):
    class Meta:
        model = OilField
        fields = '__all__'


class ReservoirSerializer(BaseSerializer):
    class Meta:
        model = Reservoir
        fields = '__all__'


class OmlOperatorSerializer(BaseSerializer):
    class Meta:
        model = OmlOperator
        fields = '__all__'


class FlowlineSerializer(BaseSerializer):
    class Meta:
        model = Flowline
        fields = '__all__'


class WellSerializer(BaseSerializer):
    class Meta:
        model = Well
        fields = '__all__'


class StationSerializer(BaseSerializer):
    class Meta:
        model = Station
        fields = '__all__'


class AGGSerializer(BaseSerializer):
    class Meta:
        model = AGG
        fields = '__all__'


class DeliveryLineSerializer(BaseSerializer):
    class Meta:
        model = DeliveryLine
        fields = '__all__'


class PipelineSerializer(BaseSerializer):
    class Meta:
        model = Pipeline
        fields = '__all__'


class TerminalSerializer(BaseSerializer):
    class Meta:
        model = Terminal
        fields = '__all__'


class ManifoldSerializer(BaseSerializer):
    class Meta:
        model = Manifold
        fields = '__all__'


class LactPointSerializer(BaseSerializer):
    class Meta:
        model = LactPoint
        fields = '__all__'


class TrunklineSerializer(BaseSerializer):
    class Meta:
        model = Trunkline
        fields = '__all__'


class LoadingBuoySerializer(BaseSerializer):
    class Meta:
        model = LoadingBuoy
        fields = '__all__'


class AssetUpgradeSerializer(BaseSerializer):
    class Meta:
        model = AssetUpgrade
        fields = '__all__'
