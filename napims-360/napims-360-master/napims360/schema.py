from graphene import ObjectType, Schema
import graphql_jwt

from napims360.graphql_schemas.queries.agg import AGGQueries, AGGMutations
from napims360.graphql_schemas.queries.asset_group import AssetGroupQueries, AssetGroupMutations
from napims360.graphql_schemas.queries.asset_upgrade import AssetUpgradeQueries, AssetUpgradeMutations
from napims360.graphql_schemas.queries.company import CompanyQueries, CompanyMutations
from napims360.graphql_schemas.queries.deliveryline import DeliveryLineQueries, DeliveryLineMutations
from napims360.graphql_schemas.queries.flowline import FlowlineQueries, FlowlineMutations
from napims360.graphql_schemas.queries.lactpoint import LactPointQueries, LactPointMutations
from napims360.graphql_schemas.queries.loading_buoy import LoadingBuoyQueries, LoadingBuoyMutations
from napims360.graphql_schemas.queries.manifold import ManifoldQueries, ManifoldMutations
from napims360.graphql_schemas.queries.oml import OmlQueries, OmlMutations
from napims360.graphql_schemas.queries.permissions import PermissionQueries, PermissionMutation
from napims360.graphql_schemas.queries.oil_field import OilFieldQueries, OilFieldMutations
from napims360.graphql_schemas.queries.omlOperator import OmlOperatorQueries, OmlOperatorMutations
from napims360.graphql_schemas.queries.pipeline import PipelineQueries, PipelineMutations
from napims360.graphql_schemas.queries.reservoir import ReservoirQueries, ReservoirMutations
from napims360.graphql_schemas.queries.station import StationQueries, StationMutations
from napims360.graphql_schemas.queries.terminal import TerminalQueries, TerminalMutations
from napims360.graphql_schemas.queries.trunkline import TrunklineQueries, TrunklineMutations
from napims360.graphql_schemas.queries.user import UserQueries, UserMutations
from napims360.graphql_schemas.queries.roles import RolesQueries, RolesMutation
from napims360.graphql_schemas.queries.well import WellQueries, WellMutations


class Query(
    AGGQueries,
    AssetGroupQueries,
    AssetUpgradeQueries,
    CompanyQueries,
    DeliveryLineQueries,
    FlowlineQueries,
    LactPointQueries,
    LoadingBuoyQueries,
    ManifoldQueries,
    OmlQueries,
    PermissionQueries,
    OilFieldQueries,
    OmlOperatorQueries,
    PipelineQueries,
    ReservoirQueries,
    RolesQueries,
    StationQueries,
    TerminalQueries,
    TrunklineQueries,
    UserQueries,
    WellQueries,
    ObjectType
):
    pass


class Mutation(
    AGGMutations,
    AssetGroupMutations,
    AssetUpgradeMutations,
    CompanyMutations,
    DeliveryLineMutations,
    FlowlineMutations,
    LactPointMutations,
    LoadingBuoyMutations,
    ManifoldMutations,
    OmlMutations,
    PermissionMutation,
    OilFieldMutations,
    OmlOperatorMutations,
    PipelineMutations,
    ReservoirMutations,
    RolesMutation,
    StationMutations,
    TerminalMutations,
    TrunklineMutations,
    UserMutations,
    WellMutations,
    ObjectType
):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()


schema = Schema(query=Query, mutation=Mutation)
