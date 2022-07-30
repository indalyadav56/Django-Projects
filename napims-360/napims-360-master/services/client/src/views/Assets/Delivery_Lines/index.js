import AssetScaffold from "../../../components/assets/AssetScaffold"
import { ADD_DELIVERYLINE, LOAD_DELIVERYLINE, DELIVERYLINE_FLOWSTATION_OPTIONS } from "../../../graphql/queries"

function DeliveryLine() {
  return (
    <AssetScaffold
      tableTitle="Delivery Line"
      addModalTitle="Create A New Delivery Line"
      typeQueryName="DeliveryLineType"
      addDocumentNode={ADD_DELIVERYLINE}
      listDocumentNode={LOAD_DELIVERYLINE}
      saveMutationInputKey="newDeliveryline"
      listQueryDataKey="deliveryline"
      linkItems='name'
      options={[{key: 'flowStation', dataKey: 'station', option: {label: 'stationType'}, documentNode: DELIVERYLINE_FLOWSTATION_OPTIONS }]}
    />
  )
}

export default DeliveryLine
