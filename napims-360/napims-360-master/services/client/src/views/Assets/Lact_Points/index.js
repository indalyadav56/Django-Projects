import AssetScaffold from "../../../components/assets/AssetScaffold"
import {
  ADD_LACTPOINT,
  LOAD_LACTPOINT,
  GET_MANIFOLD
} from "../../../graphql/queries"

function Lactpoint() {
  return (
    <AssetScaffold
      tableTitle="Lactpoints"
      addModalTitle="Create A New Lactpoint"
      typeQueryName="LactPointType"
      addDocumentNode={ADD_LACTPOINT}
      listDocumentNode={LOAD_LACTPOINT}
      saveMutationInputKey="newLactPoint"
      listQueryDataKey="lactpoint"
      linkItems="name"
      options={[
        {
          key: "manifold",
          documentNode: GET_MANIFOLD,
          option: { label: "distanceToTerminal", value: "id" }
        }
      ]}
    />
  )
}

export default Lactpoint
