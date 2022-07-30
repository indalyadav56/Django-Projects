import AssetScaffold from "../../../components/assets/AssetScaffold"
import {
  LOAD_OML_OPTIONS,
  ADD_FIELD,
  LOAD_FIELDS
} from "../../../graphql/queries"

function Fields() {
  const columnMap = c => ({
    ...c,
    oml: c?.oml?.documentNumber,
    status: c?.status ? 'Active' : 'Not Active'
  })

  return (
    <AssetScaffold
      tableTitle="Fields"
      addModalTitle="Create A New Field"
      typeQueryName="OilFieldType"
      addDocumentNode={ADD_FIELD}
      columnMap={columnMap}
      listDocumentNode={LOAD_FIELDS}
      saveMutationInputKey="newOilfield"
      listQueryDataKey="oilField"
      linkItems="name"
      options={[
        {
          key: "oml",
          documentNode: LOAD_OML_OPTIONS,
          option: { label: "documentNumber", value: "id" }
        }
      ]}
    />
  )
}

export default Fields
