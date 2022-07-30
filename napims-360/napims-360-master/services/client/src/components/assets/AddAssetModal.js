import React, { useEffect, useState } from "react"
import { AvForm } from "availity-reactstrap-validation-safe"
import AddModalScaffold from "./AddModalScaffold"
import AddModalInput from "./AddModalInput"
import AddModalSubmitButton from "./AddModalSubmitButton"
import AddModalCancelButton from "./AddModalCancelButton"
import { formExceptions, stringBetweenCaps, toTitleCase } from "../../utility/Utils"

function GroupAddModal(props) {
  const {
    fields,
    isOpen,
    toggle,
    options = {},
    onSave = () => null,
    saving = false,
    title = '',
    exceptions = []
  } = props
  const [formData, setFormData] = useState({})
  const handleSave = () => {
    const saveData = {}
    Object.keys(formData).forEach(k => {
        saveData[k] = formData[k]?.label ? formData[k]?.value : formData[k]
    })
    onSave(saveData)
  }

  const allExceptions = [...formExceptions, ...exceptions]

  const handleChange = (field, v) => {
    let updatedData = {}

    updatedData = { ...formData, [field.name]: v }
    setFormData(updatedData)
  }

  useEffect(() => {
    setFormData({})
  }, [isOpen])

  return (
    <AddModalScaffold isOpen={isOpen} toggle={toggle} title={title}>
      <AvForm >
        {
          fields
            .filter(field => !allExceptions.includes(field?.name) && !field.name.endsWith('Set') && field.type.ofType !== null  &&  field.type.ofType?.name)
            .map(field => (
              <AddModalInput
                required
                key={field.name}
                label={toTitleCase(stringBetweenCaps(field.name))}
                name={field.name}
                type={field.type.ofType.name}
                value={formData[field.name] || null}
                inputOptions={options[field.name] || (() => null)}
                onChange={(v) => {
                  handleChange(field, v)
                }}
                enumValues={field.type.ofType.enumValues}
            />))
        }
        <AddModalSubmitButton loading={saving} onClick={handleSave} />
        <AddModalCancelButton onClick={toggle} />
      </AvForm>
    </AddModalScaffold>
  )
}

export default GroupAddModal