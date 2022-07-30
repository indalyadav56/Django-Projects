import AssetScaffold from "../../../components/assets/AssetScaffold"
import {
  ADD_COMPANY,
  LOAD_COMPANIES,
  LOAD_ASSET_GROUPS
} from "../../../graphql/queries"

function Company() {
  const columnMap = c => ({
    ...c,
    assetGroup: c?.assetGroup?.name,
    productionStatus: c?.productionStatus ? 'Active' : 'Not Active'
  })

  return (
    <AssetScaffold
      tableTitle="Companies"
      addModalTitle="Create A New Company"
      typeQueryName="CompanyType"
      addDocumentNode={ADD_COMPANY}
      columnMap={columnMap}
      listDocumentNode={LOAD_COMPANIES}
      saveMutationInputKey="newCompany"
      listQueryDataKey="company"
      linkItems="name"
      options={[
        {
          key: "assetGroup",
          documentNode: LOAD_ASSET_GROUPS,
          option: { label: "name", value: "id" }
        }
      ]}
    />
  )
}

export default Company
