import AssetScaffold from "../../../components/assets/AssetScaffold"
import { ADD_ASSET_GROUP, LOAD_ASSET_GROUPS } from "../../../graphql/queries"

function Groups() {
  return (
    <AssetScaffold
      tableTitle="Asset Groups"
      addModalTitle="Create A New Asset Group"
      typeQueryName="AssetGroupType"
      addDocumentNode={ADD_ASSET_GROUP}
      listDocumentNode={LOAD_ASSET_GROUPS}
      saveMutationInputKey="newAssetgroup"
      listQueryDataKey="assetGroup"
      linkItems='name'
    />
  )
}

export default Groups
