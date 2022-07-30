import AssetScaffold from "../../../components/assets/AssetScaffold"
import { ADD_STATION, LOAD_STATION, STATION_TERMINAL_OPTION } from "../../../graphql/queries"

function Platform() {

  function columnMap(item) {
    return {
      ...item, 
      terminal: item?.terminal?.loadoutFacility,
      status: item?.status  ? 'Active' : 'Not Active'
    }
  }

  const onSaveMapValue = (value) => ({...value, stationType: 'PLATFORM'})

  return (
    <AssetScaffold
      tableTitle="Platforms"
      addModalTitle="Create A New Platform"
      typeQueryName="StationType"
      addDocumentNode={ADD_STATION}
      listDocumentNode={LOAD_STATION}
      saveMutationInputKey="newStation"
      listQueryDataKey="station"
      linkItems="name"
      columnMap={columnMap}
      onSaveMapValue={onSaveMapValue}
      addModalExceptions={["stationType"]}
      options={[{key: 'terminal', documentNode: STATION_TERMINAL_OPTION, option: {label: 'loadoutFacility'} }]}
    />
  )
}

export default Platform
