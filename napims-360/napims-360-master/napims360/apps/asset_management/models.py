from django.db import models
from django.db.models.deletion import CASCADE

from napims360.apps.common_model.models import BaseModel
from django.contrib.auth import get_user_model


AGG_TYPE = (
    ('hybrid', 'Hybrid'),
    ('standalone', 'Standalone')
)

COMPARTMENT_TYPE = (
    ('north', 'NORTH'),
    ('south', 'SOUTH'),
    ('center', 'CENTER'),
)

FLOWLINE_TYPE = (
    ('Single_tubular', 'Single Tubular'),
    ('bundled_line', 'Bundled line'),
)

PIPEGRADE = (
    ('X60', 'X60'),
    ('X42', 'X42'),
    ('X52', 'X52'),
)

RESERVOIR_RECOVERY_MECHANISM_TYPE = (
    ('wi', 'Water Injectors'),
    ('gi', 'Gas Injectors'),
    ('both', 'Both'),
)

RESERVOIR_TYPE = (
    ('ag', 'AG'),
    ('nag', 'NAG'),
    ('oil', 'OIL'),
)

STATION_TYPE = (
    ('platform', 'PLATFORM'),
    ('flowstation', 'FLOWSTATION'),
)

TERMINAL_TYPE = (
    ('general', 'General'),
    ('fpso', 'Floating Production Storage & Offloading'),
    ('fso', 'Floating Storage & Offloading'),
)

TERRAIN_TYPE = (
    ('deep_water', 'DEEP WATER'),
    ('shallow_water', 'SHALLOW WATER'),
    ('swamp', 'SWAMP'),
    ('land', 'LAND')
)

SHORE_TYPE = (
    ('onshore', 'Onshore'),
    ('offshore', 'Offshore'),
)

WELL_TYPE = (
    ('ag', 'AG'),
    ('nag', 'NAG'),
    ('oil', 'OIL'),
)


class AssetGroup(BaseModel):
    name = models.CharField(max_length=100, blank=False, null=False)


class Company(BaseModel):
    name = models.CharField(max_length=100)
    production_status = models.BooleanField(default=True)
    asset_group = models.ForeignKey(AssetGroup, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Oml(BaseModel):
    area = models.CharField(max_length=100, blank=False, null=False)
    country = models.CharField(max_length=50, blank=False, null=False)
    state = models.CharField(max_length=100, blank=False, null=False)
    basin_name = models.CharField(max_length=100, blank=False, null=False)
    opl = models.CharField(max_length=100, blank=False, null=False)
    document_number = models.CharField(max_length=100, blank=False, null=False)
    application_date = models.DateField(blank=False)
    block_size = models.DecimalField(max_digits=50, decimal_places=2, blank=False, null=False)
    onshore_size = models.DecimalField(max_digits=50, decimal_places=2, blank=False, null=False)
    shelf_size = models.DecimalField(max_digits=50, decimal_places=2, blank=False, null=False)
    deep_water_size = models.DecimalField(max_digits=50, decimal_places=2, blank=False, null=False)
    oml_class = models.CharField(max_length=100, blank=False, null=False)
    min_water_depth = models.DecimalField(max_digits=50, decimal_places=2, blank=False, null=False)
    max_water_depth = models.DecimalField(max_digits=50, decimal_places=2, blank=False, null=False)
    med_water_depth = models.DecimalField(max_digits=50, decimal_places=2, blank=False, null=False)
    lng = models.CharField(max_length=100, blank=False, null=False)
    lat = models.CharField(max_length=100, blank=False, null=False)
    X = models.CharField(max_length=100, blank=False, null=False)
    Y = models.CharField(max_length=100, blank=False, null=False)
    right_type = models.CharField(max_length=100, blank=False, null=False)
    block_validity = models.CharField(max_length=100, blank=False, null=False)
    resource_type = models.CharField(max_length=100, blank=False, null=False)


class OmlOperator(BaseModel):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='company_omloperator')
    oml = models.ForeignKey(Oml, on_delete=models.CASCADE)
    award_date = models.DateField(blank=False)
    expiry_date = models.DateField(blank=False)
    contract_status = models.BooleanField(default=False, null=False)
    contract_type = models.CharField(max_length=100, blank=False, null=False)
    is_original_operator = models.BooleanField(default=False, null=False)


class OilField(BaseModel):
    shore_type = models.CharField(max_length=100, blank=False, choices=SHORE_TYPE, null=False)
    size = models.DecimalField(max_digits=50, decimal_places=2, blank=False, null=False)
    terrain = models.CharField(max_length=100, blank=False, null=False)
    location = models.CharField(max_length=100, blank=False, null=False)
    lng = models.CharField(max_length=100, blank=False, null=False)
    lat = models.CharField(max_length=100, blank=False, null=False)
    date_discovered = models.DateField(blank=False)
    date_drilled = models.DateField(blank=False)
    data_of_exploration_completion = models.DateField(blank=False)
    area = models.CharField(max_length=100, blank=False, null=False)
    structural_geology = models.CharField(max_length=100, blank=False, null=False)
    reservoir_description = models.CharField(max_length=100, blank=False, null=False)
    oil_ultimate_recovery = models.CharField(max_length=100, blank=False, null=False)
    gas_ultimate_recovery = models.CharField(max_length=100, blank=False, null=False)
    condensate_ultimate_recovery = models.CharField(max_length=100, blank=False, null=False)
    oml = models.OneToOneField(Oml, on_delete=models.CASCADE)
    status = models.BooleanField(default=True, blank=False, null=False)


class Reservoir(BaseModel):
    name = models.CharField(max_length=100, blank=False, null=False)
    compartment = models.CharField(max_length=100, blank=False, choices=COMPARTMENT_TYPE, null=False)
    reservoir_type = models.CharField(max_length=100, blank=False, choices=RESERVOIR_TYPE, null=False)
    oil_field = models.ForeignKey(OilField, on_delete=models.CASCADE)
    gas_in_place = models.DecimalField(max_digits=50, decimal_places=2, blank=False, null=False)
    stooip = models.CharField(max_length=100, blank=False, null=False)
    number_of_op = models.IntegerField(blank=False, null=False)
    number_of_gi = models.IntegerField(blank=False, null=False)
    number_of_wi = models.IntegerField(blank=False, null=False)
    recovery_mechanism = models.CharField(max_length=100, blank=False, choices=RESERVOIR_RECOVERY_MECHANISM_TYPE, null=False)


class Flowline(BaseModel):
    name = models.CharField(max_length=100, blank=False, null=False)
    capacity = models.CharField(max_length=100, blank=False, null=False)
    location = models.CharField(max_length=100, blank=False, null=False)
    date_completed = models.DateField(blank=False)
    date_commissioned = models.DateField(blank=False)
    cost_of_construction = models.CharField(max_length=100, blank=False, null=False)
    status = models.BooleanField(default=True)
    tag = models.CharField(max_length=100, blank=False, null=False)
    nom_dia = models.CharField(max_length=100, blank=False, null=False)
    dia = models.CharField(max_length=100, blank=False, null=False)
    length = models.CharField(max_length=100, blank=False, null=False)
    flowline_type = models.CharField(max_length=100, blank=False, choices=FLOWLINE_TYPE, null=False)
    terrain = models.CharField(max_length=100, blank=False, choices=TERRAIN_TYPE, null=False)
    pipegrade = models.CharField(max_length=100, blank=False, choices=PIPEGRADE, null=False)
    wall_thickness = models.CharField(max_length=100, blank=False, null=False)
    design_pressure = models.CharField(max_length=100, blank=False, null=False)


class Well(BaseModel):
    name = models.CharField(max_length=100, blank=False, null=False)
    oil_field = models.ForeignKey(OilField, on_delete=models.CASCADE)
    reservoir = models.ForeignKey(Reservoir, on_delete=models.CASCADE)
    well_type = models.CharField(max_length=100, blank=False, choices=WELL_TYPE, null=False)
    status = models.BooleanField(default=True)
    spud_date = models.DateField(blank=False)
    rig_name = models.CharField(max_length=100, blank=False, null=False)
    rig_type = models.CharField(max_length=100, blank=False, null=False)
    lat = models.CharField(max_length=100, blank=False, null=False)
    lng = models.CharField(max_length=100, blank=False, null=False)
    X = models.CharField(max_length=100, blank=False, null=False)
    Y = models.CharField(max_length=100, blank=False, null=False)
    ground_level = models.CharField(max_length=100, blank=False, null=False)
    mean_sea_level = models.CharField(max_length=100, blank=False, null=False)
    total_depth_drilled = models.CharField(max_length=100, blank=False, null=False)
    md = models.CharField(max_length=100, blank=False, null=False)
    tvd = models.CharField(max_length=100, blank=False, null=False)
    well_architecture = models.CharField(max_length=100, blank=False, null=False)
    unique_well_identifier = models.CharField(max_length=100, blank=False, null=False)
    flowline = models.OneToOneField(Flowline, on_delete=models.CASCADE)
    is_discovery_well = models.BooleanField(default=False, null=False)


class Pipeline(BaseModel):
    name = models.CharField(max_length=100, blank=False, null=False)
    tag = models.CharField(max_length=100, blank=False, null=False)
    terrain = models.CharField(max_length=100, blank=False, choices=TERRAIN_TYPE, null=False)
    location = models.CharField(max_length=100, blank=False, null=False)
    diameter = models.CharField(max_length=100, blank=False, null=False)
    length = models.CharField(max_length=100, blank=False, null=False)
    injector = models.CharField(max_length=50, blank=False, null=False)
    status = models.BooleanField(default=True, blank=False, null=False)
    availability = models.BooleanField(default=True, blank=False, null=False)
    gross_liquid_capacity = models.CharField(max_length=100, blank=False, null=False)
    gas_capacity = models.CharField(max_length=100, blank=False, null=False)
    date_completed = models.DateField(blank=False)
    cost_construction = models.CharField(max_length=50, blank=False, null=False)
    N = models.CharField(max_length=100, blank=False, null=False)
    E = models.CharField(max_length=100, blank=False, null=False)


class Terminal(BaseModel):
    gross_liquid_capacity = models.CharField(max_length=100, blank=False, null=False)
    gas_capacity = models.CharField(max_length=100, blank=False, null=False)
    oil_treating_capacity = models.CharField(max_length=100, blank=False, null=False)
    produced_water_handling_capacity = models.CharField(max_length=100, blank=False, null=False)
    storage_tank_capacity = models.CharField(max_length=100, blank=False, null=False)
    export_pipeline = models.CharField(max_length=100, blank=False, null=False)
    location = models.CharField(max_length=100, blank=False, null=False)
    date_completed = models.DateField(blank=False)
    date_commissioned = models.DateField(blank=False)
    cost_of_construction = models.CharField(max_length=100, blank=False, null=False)
    loadout_facility = models.CharField(max_length=100, blank=False, null=False)
    lat = models.CharField(max_length=50, blank=False, null=False)
    lng = models.CharField(max_length=50, blank=False, null=False)
    terminal_type = models.CharField(max_length=100, blank=False, choices=TERMINAL_TYPE, null=False)


class LoadingBuoy(BaseModel):
    name = models.CharField(max_length=100, blank=False, null=False)
    terminal = models.ForeignKey(Terminal, on_delete=models.CASCADE)


class Station(BaseModel):
    station_type = models.CharField(max_length=100, blank=False, choices=STATION_TYPE, null=False)
    terrain = models.CharField(max_length=100, blank=False, choices=TERRAIN_TYPE, null=False)
    specification = models.CharField(max_length=100, blank=False, null=False)
    design_capacity = models.CharField(max_length=100, blank=False, null=False)
    available_capacity = models.DateField(blank=False)
    N = models.CharField(max_length=100, blank=False, null=False)
    E = models.CharField(max_length=100, blank=False, null=False)
    date_completed = models.DateField(blank=False)
    date_commissioned = models.DateField(blank=False)
    cost_of_construction = models.CharField(max_length=100, blank=False, null=False)
    gross_liquid_capacity = models.CharField(max_length=100, blank=False, null=False)
    gas_capacity = models.CharField(max_length=100, blank=False, null=False)
    status = models.BooleanField(default=True)
    availability = models.BooleanField(default=True)
    terminal = models.ForeignKey(Terminal, on_delete=models.CASCADE)


class AGG(BaseModel):
    capacity = models.CharField(max_length=100, blank=False, null=False)
    status = models.BooleanField(default=True)
    agg_type = models.CharField(max_length=100, blank=False, choices=AGG_TYPE, null=False)
    specification = models.CharField(max_length=100, blank=False, null=False)
    design_capacity = models.CharField(max_length=50, blank=False, null=False)
    available_capacity = models.CharField(max_length=50, blank=False, null=False)
    availability = models.BooleanField(default=True)
    N = models.CharField(max_length=100, blank=False, null=False)
    E = models.CharField(max_length=100, blank=False, null=False)
    date_completed = models.DateField(blank=False)
    date_commissioned = models.DateField(blank=False)
    cost_of_construction = models.CharField(max_length=100, blank=False, null=False)
    gross_liquid_capacity = models.CharField(max_length=100, blank=False, null=False)
    gas_capacity = models.CharField(max_length=100, blank=False, null=False)
    temperature = models.CharField(max_length=100, blank=False, null=False)
    pressure = models.CharField(max_length=100, blank=False, null=False)
    station = models.ForeignKey(Station, on_delete=models.CASCADE)


class Trunkline(BaseModel):
    name = models.CharField(max_length=100, blank=False, null=False)
    terminal = models.ForeignKey(Terminal, on_delete=models.CASCADE)
    terrain = models.CharField(max_length=100, blank=False, choices=TERRAIN_TYPE, null=False)
    location = models.CharField(max_length=100, blank=False, null=False)
    diameter = models.CharField(max_length=100, blank=False, null=False)
    length = models.CharField(max_length=100, blank=False, null=False)
    injector = models.CharField(max_length=100, blank=False, null=False)
    status = models.BooleanField(default=True)
    availability = models.BooleanField(default=True)
    gross_liquid_capacity = models.CharField(max_length=100, blank=False, null=False)
    gas_capacity = models.CharField(max_length=100, blank=False, null=False)
    N = models.CharField(max_length=100, blank=False, null=False)
    E = models.CharField(max_length=100, blank=False, null=False)
    date_completed = models.DateField(blank=False)
    date_commissioned = models.DateField(blank=False)
    design_pressure = models.CharField(max_length=100, blank=False, null=False)


class DeliveryLine(BaseModel):
    capacity = models.CharField(max_length=100, blank=False, null=False)
    location = models.CharField(max_length=100, blank=False, null=False)
    flow_station = models.OneToOneField(Station, on_delete=models.CASCADE)
    date_completed = models.DateField(blank=False)
    date_commissioned = models.DateField(blank=False)
    cost_of_construction = models.CharField(max_length=100, blank=False, null=False)
    status = models.BooleanField(default=True)
    length = models.CharField(max_length=100, blank=False, null=False)
    tag = models.CharField(max_length=100, blank=False, null=False)
    nom_dia = models.CharField(max_length=100, blank=False, null=False)
    delivery_line_type = models.CharField(max_length=100, blank=False, null=False)
    env = models.CharField(max_length=100, blank=False, null=False)
    pipe_grade = models.CharField(max_length=100, blank=False, choices=PIPEGRADE, null=False)
    wall_thickness = models.CharField(max_length=100, blank=False, null=False)
    design_pressure = models.CharField(max_length=100, blank=False, null=False)


class Manifold(BaseModel):
    lat = models.CharField(max_length=100, blank=False, null=False)
    lng = models.CharField(max_length=100, blank=False, null=False)
    distance_to_terminal = models.CharField(max_length=100, blank=False, null=False)
    trunkline = models.ForeignKey(Trunkline, on_delete=models.CASCADE)
    deliveryline = models.OneToOneField(DeliveryLine, on_delete=models.CASCADE)


class LactPoint(BaseModel):
    lact_name = models.CharField(max_length=100, blank=False, null=False)
    lact_id = models.CharField(max_length=100, blank=False, null=False)
    lact_sn = models.CharField(max_length=100, blank=False, null=False)
    manifold = models.OneToOneField(Manifold, on_delete=models.CASCADE)
    average_volume = models.CharField(max_length=100, blank=False, null=False)
    repeatability = models.CharField(max_length=100, blank=False, null=False)
    average_repeatability = models.CharField(max_length=100, blank=False, null=False)
    shift = models.CharField(max_length=100, blank=False, null=False)


class AssetUpgrade(BaseModel):
    asset_type = models.CharField(max_length=100, blank=False, null=False)
    asset_id = models.CharField(max_length=100, blank=False, null=False)
    date_of_upgrade = models.DateField(blank=False)
    cost_of_upgrade = models.CharField(max_length=100, blank=False, null=False)
    note = models.CharField(max_length=255, blank=False, null=False)
