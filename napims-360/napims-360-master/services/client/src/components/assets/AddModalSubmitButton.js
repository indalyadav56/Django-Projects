import React from "react"
import { Button } from "reactstrap"

function AddModalSubmitButton(props) {
  return (
    <Button className="mr-1" color="primary" disabled={props.loading} {...props}>
      {props.loading ? 'Loading...' : 'Submit'}
    </Button>
  )
}

export default AddModalSubmitButton