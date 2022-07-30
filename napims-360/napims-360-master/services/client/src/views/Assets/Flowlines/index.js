import AssetScaffold from "../../../components/assets/AssetScaffold"
import { ADD_FLOWLINE, LOAD_FLOWLINES } from "../../../graphql/queries"

function FlowLine() {
  
  return (
    <AssetScaffold
      tableTitle="Flowline"
      addModalTitle="Create A New Flowline"
      typeQueryName="FlowlineType"
      addDocumentNode={ADD_FLOWLINE}
      listDocumentNode={LOAD_FLOWLINES}
      saveMutationInputKey="newFlowline"
      listQueryDataKey="flowline"
      linkItems="name"
    />
  )
}

export default FlowLine
