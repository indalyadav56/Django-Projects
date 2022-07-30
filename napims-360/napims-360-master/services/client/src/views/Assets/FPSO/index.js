import React, { useEffect, useState } from "react"

import TableScaffold from "../../../components/assets/TableScaffold"
import AddModal from "../../../components/assets/AddAssetModal"
import useIsModal from "../../../hooks/assets/useIsModal"
import useTypeQuery from "../../../hooks/assets/useTypeQuery"
import { generateColumns } from "../../../utility/Utils"
import { useLazyQuery, useMutation } from "@apollo/client"
import { ADD_TERMINAL, LOAD_TERMINAL } from "../../../graphql/queries"

function Terminal() {
  const [addData, { loading: saving }] = useMutation(ADD_TERMINAL)

  const { isModal, toggleModal } = useIsModal()
  const [formData, setFormData] = useState({})
  const { data: { __type: { fields = []} = {} } = {}} = useTypeQuery({ variables: { name: "TerminalType" } })
  const [loadData, { data: fetchedData, loading: loadingData }] = useLazyQuery(LOAD_TERMINAL, { fetchPolicy: "network-only" })

  const [tableData, setTableData] = useState([])


  const saveForm = (newTerminal) => {
    addData({ variables: { newTerminal } })
    .then(() => {
      toggleModal()
      loadData()
    })
  }

  const processData = cData => cData
  
  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setTableData(fetchedData?.terminal || [])
  }, [fetchedData])

  return (
    <>
      <TableScaffold
        title="FPSOs"
        columns={generateColumns(fields, 'name')}
        data={processData(tableData)}
        toggleAddModal={toggleModal}
      />
      <AddModal
        title="Create A New FPSO"
        isOpen={isModal}
        fields={fields}
        toggle={toggleModal}
        options={{}}
        saving={saving}
        onSave={saveForm}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  )
}

export default Terminal
