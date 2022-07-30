import AssetScaffold from "../../../components/assets/AssetScaffold"
import { ADD_AGG, LOAD_AGG, AGG_STATION_OPTION } from "../../../graphql/queries"

function AggStation() {

  const columnMap = (item) => ({
    ...item,
    status: item?.status ? "Active" : "Not Active",
    station: item?.station?.stationType
  })

  return (
    <AssetScaffold
      tableTitle="AGG Station"
      addModalTitle="Create A New AggStation"
      typeQueryName="AGGType"
      addDocumentNode={ADD_AGG}
      listDocumentNode={LOAD_AGG}
      saveMutationInputKey="newAgg"
      listQueryDataKey="agg"
      linkItems="name"
      columnMap={columnMap}
      options={[{key: 'station', documentNode: AGG_STATION_OPTION, option: {label: 'stationType'} }]}
    />
  )
}

export default AggStation
