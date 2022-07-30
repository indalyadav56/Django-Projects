import React, { useEffect, useState } from "react"

import Spinner from '@components/spinner/Loading-spinner'

import TableScaffold from "../../../components/assets/TableScaffold"
import AddModal from "../../../components/assets/AddAssetModal"
import useIsModal from "../../../hooks/assets/useIsModal"
import useTypeQuery from "../../../hooks/assets/useTypeQuery"
import { generateColumns } from "../../../utility/Utils"
import { useLazyQuery, useMutation } from "@apollo/client"
import { ADD_OML, LOAD_OML } from "../../../graphql/queries"

function OML() {
  const { isModal, toggleModal } = useIsModal()
  const [addOML, { loading: saving }] = useMutation(ADD_OML)
  const [loadData, { data: fetchedData, loading: loadingData }] = useLazyQuery(LOAD_OML, { fetchPolicy: "network-only" })

  const { data: { __type: { fields = []} = {} } = {}} = useTypeQuery({ variables: { name: "OmlType" } })

  const [tableData, setTableData] = useState([])


  const saveForm = (newOml) => {
    addOML({ variables: { newOml } })
    .then(() => {
      toggleModal()
      loadData()
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setTableData(fetchedData?.oml || [])
  }, [fetchedData])

  if (loadingData) return <Spinner />

  return (
    <>
      <TableScaffold
        title="OMLs"
        columns={generateColumns(fields, 'name')}
        data={tableData || []}
        toggleAddModal={toggleModal}
      />
      <AddModal
        title="Create A New OML"
        isOpen={isModal}
        fields={fields}
        toggle={toggleModal}
        saving={saving}
        onSave={saveForm}
      />
    </>
  )
}

export default OML
