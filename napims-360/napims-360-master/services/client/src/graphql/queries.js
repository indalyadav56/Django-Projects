import { gql } from "@apollo/client"

export const LOAD_ASSETS_TOTAL = gql`
  query {
    company{
      total
    }
    assetGroup{
        total
    }
    well{
      total
    }
    oilField{
        total
    }
    agg{
        total
    }
    station{
        total
    }
    platform{
        total
    }
    trunkline{
        total
    }
    deliveryline{
        total
    }
    pipeline{
        total
    }
    lactpoint{
        total
    }
    flowline{
        total
    }
    oml{
        total
    }
    terminal{
        total
    }
    fso{
        total
    }
    fpso{
        total
    }
    reservoir{
        total
    }
  }
`

export const LOAD_ASSET_GROUPS = gql`
  query GetAssetGroup($page: Int, $search: String){
    assetGroup(page: $page, search: $search) {
      total
      size
      current
      hasNext
      hasPrev
      results {
        name
        id
      }
    }
  }
`

export const LOAD_COMPANIES = gql`
  query GetCompanies($page: Int, $search: String) {
    company(page: $page, search: $search) {
      total
      size
      current
      hasNext
      hasPrev
      results {
        id
        name
        productionStatus
        assetGroup {
          name
        }
      }
    }
  }
`

export const LOAD_FIELDS = gql`
  query GetFields($page: Int, $search: String){
    oilField(page: $page, search: $search) {
      total
      size
      current
      hasNext
      hasPrev
      results {
        id
        shoreType
        size
        terrain
        location
        lat
        lng
        dateDrilled
        dateDiscovered
        area
        dataOfExplorationCompletion
        structuralGeology
        reservoirDescription
        oilUltimateRecovery
        gasUltimateRecovery
        condensateUltimateRecovery
        oml {
          documentNumber
        }
        status
      }
    }
  }
`

export const LOAD_FLOWLINE = gql`
  query GetFlowlines($page: Int, $search: String){
    flowline(page: $page, search: $search) {
      total
      size
      current
      hasNext
      hasPrev
      results {
        id
        capacity
        costOfConstruction
        dateCommissioned
        dateCompleted
        location
        designPressure
        dia
        flowlineType
        length
        location
        name
        nomDia
        pipegrade
        tag
        terrain
        wallThickness
      }
    }
  }
`

export const LOAD_TERMINAL = gql`
  query GetTerminals($page: Int, $search: String){
    terminal(page: $page, search: $search) {
      total
      size
      current
      hasNext
      hasPrev
      results {
      terminalType
        lat
        lng
        loadoutFacility
        costOfConstruction
        dateCommissioned
        dateCompleted
        location
        exportPipeline
        storageTankCapacity
        producedWaterHandlingCapacity
        oilTreatingCapacity
        gasCapacity
        grossLiquidCapacity
        id
      }
    }
  }
`

export const LOAD_WELLS = gql`
  query GetWells($page: Int, $search: String){
    well(page: $page, search: $search) {
      total
      size
      current
      hasNext
      hasPrev
      results {
        name
        oilField {
          area
        }
        reservoir {
          name
        }
        wellType
        status
        spudDate
        rigName
        lat
        lng
        X
        Y
        groundLevel
        meanSeaLevel
        totalDepthDrilled
        md
        tvd
        wellArchitecture
        uniqueWellIdentifier
        flowline {
          name
        }
        isDiscoveryWell
      }
    }
  }
`

export const LOAD_RESERVOIR = gql`
  query GetReservoirs($page: Int, $search: String){
    reservoir(page: $page, search: $search) {
      total
      size
      current
      hasNext
      hasPrev
      results {
        id
        name
        compartment
        reservoirType
        oilField {
          area
        }
        gasInPlace
        stooip
        numberOfOp
        numberOfGi
        numberOfWi
        recoveryMechanism
      }
    }
  }
`

export const LOAD_OML = gql`
  query GetOml($page: Int, $search: String){
    oml(page: $page, search: $search) {
      total
      size
      current
      hasNext
      hasPrev
      results {
        id
        area
        country
        state
        basinName
        opl
        documentNumber
        applicationDate
        blockSize
        onshoreSize
        shelfSize
        deepWaterSize
        omlClass
        minWaterDepth
        maxWaterDepth
        medWaterDepth
        lng
        lat
        X
        Y
        rightType
        blockValidity
        resourceType
      }
    }
  }
`

export const DELIVERYLINE_FLOWSTATION_OPTIONS = gql`
  query DeliverylineFlowstationOptions($search: String) {
    station(search: $search) {
      results {
        id
        stationType
      }
    }
  }
`

export const LOAD_OML_OPTIONS = gql`
  query GetOmlOption($search: String){
    oml(search: $search) {
      results {
        id
        documentNumber
      }
    }
  }
`

export const LOAD_FLOWLINE_OPTIONS = gql`
  query GetFlowlineOptions($search: String){
    flowline(search: $search) {
      results {
        id
        name
      }
    }
  }
`

export const LOAD_RESERVOIR_OPTIONS = gql`
  query GetReservoirOptions($search: String){
    reservoir(search: $search) {
      results {
        id
        name
      }
    }
  }
`

export const LOAD_FIELD_OPTIONS = gql`
  query GetFieldOptions($search: String){
    oilField(search: $search) {
      results {
        id
        area
      }
    }
  }
`

export const ADD_COMPANY = gql`
  mutation CreateCompany($newCompany: CompanyCreateGenericType!) {
    createCompany(newCompany: $newCompany) {
      ok
      company {
        name
        assetGroup {
          name
        }
      }
    }
  }
`

export const ADD_ASSET_GROUP = gql`
  mutation CreateAssetGroup($newAssetgroup: AssetGroupCreateGenericType!) {
    createAssetGroup(newAssetgroup: $newAssetgroup) {
      ok
    }
  }
`

export const ADD_OML = gql`
  mutation CreateOml($newOml: OmlCreateGenericType!) {
    createOml(newOml: $newOml) {
      ok
    }
  }
`

export const LOAD_FLOWLINES = gql`
  query LoadFlowline {
    flowline {
      id
      name
      capacity
      location
      dateCompleted
      dateCommissioned
      costOfConstruction
      status
      tag
      nomDia
      dia
      length
      flowlineType
      terrain
      pipegrade
      wallThickness
      designPressure
    }
  }
`

export const ADD_RESERVOIR = gql`
  mutation CreateReservoir($newReservoir: ReservoirCreateGenericType!) {
    createReservoir(newReservoir: $newReservoir) {
      ok
    }
  }
`

export const ADD_WELL = gql`
  mutation CreateWell($newWell: WellCreateGenericType!) {
    createWell(newWell: $newWell) {
      ok
      errors {
        field
        messages
      }
    }
  }
`

export const ADD_FIELD = gql`
  mutation CreateOilField($newOilfield: OilFieldCreateGenericType!) {
    createOilField(newOilfield: $newOilfield) {
      ok
    }
  }
`

export const ADD_TERMINAL = gql`
  mutation CreateTerminal($newTerminal: TerminalCreateGenericType!) {
    createTerminal(newTerminal: $newTerminal) {
      ok
    }
  }
`

export const ADD_FLOWLINE = gql`
  mutation AddFlowline($newFlowline: FlowlineCreateGenericType!) {
    createFlowline(newFlowline: $newFlowline) {
      ok
    }
  }
`

export const LOAD_LACTPOINT = gql`
  query LoadLactPoint {
    lactpoint {
      id
      created
      isDeleted
      modified
      lactName
      lactId
      lactSn
      manifold {
        id
      }
      averageVolume
      repeatability
      averageRepeatability
      shift
    }
  }
`

export const ADD_LACTPOINT = gql`
  mutation AddLactPoint($newLactPoint: LactPointCreateGenericType!) {
    createLactPoint(newLactpoint: $newLactPoint) {
      ok
    }
  }
`

export const LOAD_PIPELINE = gql`
  query LoadPipeline {
    pipeline {
      id
      created
      isDeleted
      modified
      status
      name
      tag
      terrain
      location
      diameter
      length
      injector
      status
      availability
      grossLiquidCapacity
      gasCapacity
      dateCompleted
      costConstruction
      N
      E
    }
  }
`

export const ADD_PIPELINE = gql`
  mutation AddPipeline($newPipeline: PipelineCreateGenericType!) {
    createPipeline(newPipeline: $newPipeline) {
      ok
    }
  }
`

export const LOAD_DELIVERYLINE = gql`
  query LoadDeliverLine {
    deliveryline {
      id
      created
      isDeleted
      modified
      capacity
      location
      # flowStation {
      #   id
      # }
      dateCompleted
      dateCommissioned
      costOfConstruction
      status
      length
      tag
      nomDia
      deliveryLineType
      env
      pipeGrade
      wallThickness
      designPressure
      manifold {
        id
      }
    }
  }
`

export const ADD_DELIVERYLINE = gql`
  mutation CreateDeliveryLine(
    $newDeliveryline: DeliveryLineCreateGenericType!
  ) {
    createDeliveryLine(newDeliveryline: $newDeliveryline) {
      ok
    }
  }
`

export const LOAD_TRUNKLINE = gql`
  query LoadTrunkline {
    trunkline {
      id
      created
      isDeleted
      modified
      name
      # terminal {
      #   id
      # }
      location
      diameter
      length
      injector
      status
      availability
      grossLiquidCapacity
      gasCapacity
      N
      E
      dateCompleted
      dateCommissioned
      designPressure
      # manifoldSet {
      #   id
      # }
    }
  }
`
export const ADD_TRUNKLINE = gql`
  mutation CreateTrunkline($newTrunkline: TrunklineCreateGenericType!) {
    createTrunkline(newTrunkline: $newTrunkline) {
      ok
    }
  }
`

export const TRUNKLINE_TERMINAL_OPTION = gql`
  query StationTerminalOptions {
    terminal {
      id
      loadoutFacility
    }
  }
`

export const LOAD_STATION = gql`
  query LoadStation {
    station {
      id
      created
      isDeleted
      modified
      stationType
      terrain
      specification
      designCapacity
      availability
      N
      E
      dateCompleted
      dateCommissioned
      costOfConstruction
      grossLiquidCapacity
      gasCapacity
      status
      availability
      terminal {
        id
        
      }
    }
  }
`

export const ADD_STATION = gql`
  mutation CreateStation($newStation: StationCreateGenericType!) {
    createStation(newStation: $newStation) {
      ok
    }
  }
`

export const STATION_TERMINAL_OPTION = gql`
  query StationTerminalOptions {
    terminal {
      id
      loadoutFacility
    }
  }
`

export const LOAD_AGG = gql`
  query LoadAGG {
    agg {
      id
      created
      isDeleted
      modified
      capacity
      status
      aggType
      specification
      designCapacity
      availability
      N
      E
      dateCompleted
      dateCommissioned
      costOfConstruction
      grossLiquidCapacity
      gasCapacity
      temperature
      pressure
      station {
        id
        stationType
      }
    }
  }
`

export const ADD_AGG = gql`
  mutation CreateAGG($newAgg: AGGCreateGenericType!) {
    createAGG(newAgg: $newAgg) {
      ok
    }
  }
`
export const AGG_STATION_OPTION = gql`
  query AggStationOptions {
    station {
      id
      stationType
    }
  }
`

export const GET_MANIFOLD = gql`
  query GetManifold {
    manifold {
      id
      distanceToTerminal
    }
  }
`
