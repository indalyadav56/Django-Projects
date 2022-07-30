import AssetScaffold from "../../../components/assets/AssetScaffold"
import { ADD_PIPELINE, LOAD_PIPELINE } from "../../../graphql/queries"

function Pipeline() {

  return (
    <AssetScaffold
      tableTitle="Pipelines"
      addModalTitle="Create A New Pipeline"
      typeQueryName="PipelineType"
      addDocumentNode={ADD_PIPELINE}
      listDocumentNode={LOAD_PIPELINE}
      saveMutationInputKey="newPipeline"
      listQueryDataKey="pipeline"
      linkItems='name'
    />
  )
}

export default Pipeline
