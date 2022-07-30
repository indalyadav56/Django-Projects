import AssetScaffold from "../../../components/assets/AssetScaffold"
import { ADD_TRUNKLINE, LOAD_TRUNKLINE, TRUNKLINE_TERMINAL_OPTION } from "../../../graphql/queries"

function Trunkline() {

  return (
    <AssetScaffold
      tableTitle="Trunklines"
      addModalTitle="Create A New Trunkline"
      typeQueryName="TrunklineType"
      addDocumentNode={ADD_TRUNKLINE}
      listDocumentNode={LOAD_TRUNKLINE}
      saveMutationInputKey="newTrunkline"
      listQueryDataKey="trunkline"
      linkItems='name'
      options={[{key: 'terminal', documentNode:TRUNKLINE_TERMINAL_OPTION, option: {label: 'loadoutFacility'} }]}
    />
  )
}

export default Trunkline
