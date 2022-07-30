import AssetScaffold from "../../../components/assets/AssetScaffold"
import {
  ADD_WELL,
  LOAD_WELLS,
  LOAD_RESERVOIR_OPTIONS,
  LOAD_FIELD_OPTIONS,
  LOAD_FLOWLINE_OPTIONS
} from "../../../graphql/queries"

function Wells() {
  const columnMap = c => ({
    ...c,
    oilField: c?.oilField?.area,
    reservoir: c?.reservoir?.name,
    flowline: c?.flowline?.name,
    status: c?.status ? 'Active' : 'Not Active'
  })

  return (
    <AssetScaffold
      tableTitle="Wells"
      addModalTitle="Create A New Well"
      typeQueryName="WellType"
      addDocumentNode={ADD_WELL}
      columnMap={columnMap}
      listDocumentNode={LOAD_WELLS}
      saveMutationInputKey="newWell"
      listQueryDataKey="well"
      linkItems="name"
      options={[
        {
          key: "reservoir",
          documentNode: LOAD_RESERVOIR_OPTIONS,
          option: { label: "name", value: "id" }
        },
        {
          key: "oilField",
          documentNode: LOAD_FIELD_OPTIONS,
          option: { label: "area", value: "id" }
        },
        {
          key: "flowline",
          documentNode: LOAD_FLOWLINE_OPTIONS,
          option: { label: "name", value: "id" }
        }
      ]}
    />
  )
}

export default Wells
