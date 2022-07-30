import { AvForm } from "availity-reactstrap-validation-safe"
import AddModalScaffold from "../../../components/assets/AddModalScaffold"
// import AddModalInput from "../../../components/assets/AddModalInput"
import AddModalSubmitButton from "../../../components/assets/AddModalSubmitButton"
import AddModalCancelButton from "../../../components/assets/AddModalCancelButton"

function DeliveryLineAddModal(props) {
  const { isOpen, toggle } = props

  return (
    <AddModalScaffold isOpen={isOpen} toggle={toggle} title="Add Delivery Line">
      <AvForm>
        <AddModalSubmitButton onClick={toggle} />
        <AddModalCancelButton onClick={toggle} />
      </AvForm>
    </AddModalScaffold>
  )
}

export default DeliveryLineAddModal
