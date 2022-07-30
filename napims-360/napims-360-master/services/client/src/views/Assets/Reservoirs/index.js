import React, { useEffect, useState } from "react"

import TableScaffold from "../../../components/assets/TableScaffold"
import AddModal from "../../../components/assets/AddAssetModal"
import useIsModal from "../../../hooks/assets/useIsModal"
import useTypeQuery from "../../../hooks/assets/useTypeQuery"
import { generateColumns } from "../../../utility/Utils"
import { useApolloClient, useLazyQuery, useMutation } from "@apollo/client"
import { ADD_RESERVOIR, LOAD_FIELD_OPTIONS, LOAD_RESERVOIR } from "../../../graphql/queries"

function Reservoir() {
  const client = useApolloClient()
  const [addData, { loading: saving }] = useMutation(ADD_RESERVOIR)

  const { isModal, toggleModal } = useIsModal()
  const [formData, setFormData] = useState({})
  const { data: { __type: { fields = []} = {} } = {}} = useTypeQuery({ variables: { name: "ReservoirType" } })
  const [loadData, { data: fetchedData, loading: loadingData }] = useLazyQuery(LOAD_RESERVOIR, { fetchPolicy: "network-only" })

  const [tableData, setTableData] = useState([])

  const oilFieldOptions = async () => {
    try {
      const { data } = await client.query({ query: LOAD_FIELD_OPTIONS })
      return data?.oilField?.map(d => ({ label: d.area, value: d.id }))
    } catch (er) {
      return []
    }
  }

  const saveForm = (newReservoir) => {
    addData({ variables: { newReservoir } })
    .then(() => {
      toggleModal()
      loadData()
    })
  }

  const processData = (cData) => (cData?.map(c => ({
    ...c,
    oilField: c?.oilField?.area
  })))
  
  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setTableData(fetchedData?.reservoir || [])
  }, [fetchedData])

  return (
    <>
      <TableScaffold
        title="Reservoirs"
        columns={generateColumns(fields, 'name')}
        data={processData(tableData)}
        toggleAddModal={toggleModal}
      />
      <AddModal
        title="Create A New Reservoir"
        isOpen={isModal}
        fields={fields}
        toggle={toggleModal}
        options={{
          oilField: oilFieldOptions
        }}
        saving={saving}
        onSave={saveForm}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  )
}

export default Reservoir
