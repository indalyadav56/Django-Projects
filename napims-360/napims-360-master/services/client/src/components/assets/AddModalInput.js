import React from "react"
import { Label, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"
import { AvGroup, AvInput } from "availity-reactstrap-validation-safe"
import Flatpickr from "react-flatpickr"
import { User, Instagram, Mail, Calendar, DollarSign, X } from 'react-feather'
import AsyncSelect from 'react-select/async'
import Select from 'react-select'


const getInputIcons = (key) => {
  switch (key.toLowerCase()) {
    case 'user':
      return <User size={15} />
    case 'Date':
    case 'DateTime':
      return <Calendar size={15} />
    case 'money':
      return <DollarSign size={15} />
    case 'brief':
      return <Briefcase size={15} />
    case 'email':
      return <Mail size={15} />
    default:
      return <Instagram size={15} />
  }
}

const getInput = (type, props) => {
  if (type.endsWith('Type')) {
    return (
      <div style={{ flexGrow: 1 }}>
        <AsyncSelect
          cacheOptions
          defaultOptions
          placeholder="Select..."
          loadOptions={props.inputOptions}
          {...props}
          />
      </div>
    )
  }
  if (type.endsWith('Choices')) {
    return (
      <div style={{ flexGrow: 1 }}>
        <Select
          placeholder="Select..."
          options={(props.enumValues || [])?.map(v => ({ label: v.description, value: v.name }))}
          {...props}
        />
      </div>
    )
  }
  switch (type) {
    case 'Boolean':
      return (
        <div style={{ flexGrow: 1 }}>
          <Select
            placeholder="Select..."
            options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
            {...props}
          />
        </div>
      )
    case 'Decimal':
    case 'Int':
      return <AvInput {...props} type="number" onChange={({ target: { value } }) => props.onChange(+value)} />
    case 'Date':
    case 'DateTime':
      return <AvInput {...props} type="date" onChange={({ target: { value } }) => props.onChange(value)} />
    default:
      return <AvInput {...props} onChange={({ target: { value } }) => props.onChange(value)} />
  }
}


function AddModalInput(props) {
  const { name, label, type } = props

  return (
    <AvGroup>
      <Label for={name}>{label}</Label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            {getInputIcons(type)}
          </InputGroupText>
        </InputGroupAddon>
        {getInput(type, props)}
      </InputGroup>
    </AvGroup>
  )
}

export default AddModalInput
