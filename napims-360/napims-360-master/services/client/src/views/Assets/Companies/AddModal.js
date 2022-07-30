import React from "react"
import { AvForm } from "availity-reactstrap-validation-safe"
import AddModalScaffold from "../../../components/assets/AddModalScaffold"
import AddModalInput from "../../../components/assets/AddModalInput"
import AddModalSubmitButton from "../../../components/assets/AddModalSubmitButton"
import AddModalCancelButton from "../../../components/assets/AddModalCancelButton"

function CompanyAddModal(props) {
  const { isOpen, toggle } = props

  return (
    <AddModalScaffold isOpen={isOpen} toggle={toggle} title="Add New Company">
      <AvForm>
        <AddModalInput label="Name" name="name" />
        <AddModalInput
          label="Production Status"
          name="production_status"
          type="select"
        >
          <option>Active</option>
          <option>In Active</option>
        </AddModalInput>
        <AddModalSubmitButton onClick={toggle} />
        <AddModalCancelButton onClick={toggle} />
      </AvForm>
    </AddModalScaffold>
  )
}

export default CompanyAddModal
