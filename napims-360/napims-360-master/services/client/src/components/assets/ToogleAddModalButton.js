import React from "react"
import { Button } from "reactstrap"
import { Plus } from "react-feather"

function TableToggleAddModalButton(props) {
  return (
    <Button className="ml-2" color="primary" {...props}>
      <Plus size={15} />
      <span className="align-middle ml-50">Add Record</span>
    </Button>
  )
}

export default TableToggleAddModalButton
