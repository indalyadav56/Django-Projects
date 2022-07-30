import React from "react"
import { Button } from "reactstrap"
import { AvForm } from "availity-reactstrap-validation-safe"
import AddModalScaffold from "../../../components/assets/AddModalScaffold"
import AddModalInput from "../../../components/assets/AddModalInput"
import AddModalSubmitButton from "../../../components/assets/AddModalSubmitButton"
import AddModalCancelButton from "../../../components/assets/AddModalCancelButton"

const AddModal = (props) => {
  const { isOpen, toggle } = props
  const [picker, setPicker] = React.useState(new Date())

  return (
    <AddModalScaffold isOpen={isOpen} toggle={toggle} title="Add New Field">
      <AvForm>
        <AddModalInput label="Field Name" name="field_name" />
        <AddModalInput label="Shore Type" name="shore_type" type="select">
          <option>Off-Shore</option>
          <option>On-Shore</option>
        </AddModalInput>
        <AddModalInput label="Size" name="size" />
        <AddModalInput label="Terrain" name="terrain" />
        <AddModalInput label="Location" name="location" />
        <AddModalInput label="Lng" name="lng" />
        <AddModalInput label="lat" name="lat" />
        <AddModalInput
          type="date"
          label="Discovery Date"
          name="date_discovered"
          value={picker}
          onChange={(date) => setPicker(date)}
        />
        <AddModalInput
          type="date"
          label="Drilled Date"
          name="date_drilled"
          value={picker}
          onChange={(date) => setPicker(date)}
        />
        <AddModalInput
          type="date"
          label="Exploration Completion Date"
          name="date_of_exploration_completion"
          value={picker}
          onChange={(date) => setPicker(date)}
        />
        <AddModalInput label="OML" name="oml_id" type="select">
          <option>OML 1</option>
          <option>OML 2</option>
        </AddModalInput>
        <AddModalInput label="Area" name="area" />
        <AddModalInput label="Discovery Well" name="discovery_well" />
        <AddModalInput label="Structural Geology" name="structural_geology" />
        <AddModalInput
          label="Reservoir Description"
          name="reservoir_description"
        />
        <AddModalInput
          label="Oil Ultimate Recovery"
          name="oil_ultimate_recovery"
        />
        <AddModalInput
          label="Gas Ultimate Recovery"
          name="gas_ultimate_recovery"
        />
        <AddModalInput
          label="Condensate Ultimate Recovery"
          name="condensate_ultimate_recovery"
        />
        <AddModalSubmitButton onClick={toggle} />
        <AddModalCancelButton onClick={toggle} />
      </AvForm>
    </AddModalScaffold>
  )
}

export default AddModal
