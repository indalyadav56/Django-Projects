import React from 'react'

// ** Reactstrap
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardText,
  Col,
  CustomInput,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Table
} from 'reactstrap'

const roleSections = [
  'Asset Groups',
  'Companies',
  'Wells',
  'Fields'
]

const PermissionsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Permissions</CardTitle>
      </CardHeader>
      <CardText className='ml-2'>Select Permissions for this role</CardText>
      <Table striped borderless responsive>
        <thead className='thead-light'>
          <tr>
            <th>Module</th>
            <th>All</th>
            <th>Read</th>
            <th>Write</th>
            <th>Create</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            roleSections.map(role => (
              <tr key={role}>
                <td>{role}</td>
                <td>
                  <CustomInput type='checkbox' id='staff-1' label='' />
                </td>
                <td>
                  <CustomInput type='checkbox' id='staff-1' label='' />
                </td>
                <td>
                  <CustomInput type='checkbox' id='staff-2' label='' defaultChecked />
                </td>
                <td>
                  <CustomInput type='checkbox' id='staff-3' label='' />
                </td>
                <td>
                  <CustomInput type='checkbox' id='staff-4' label='' />
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Card>
  )
}

const AddPermissionModal = ({ toggleModal, show }) => {
  return (
    <Modal
      isOpen={show}
      toggle={toggleModal}
      className={`modal-dialog-c
      entered modal-xl`}
    >
      <ModalHeader toggle={toggleModal}>
        Create Role
      </ModalHeader>
      <ModalBody>

        <Row>
          <Col md='6' sm='12'>
            <FormGroup>
              <Label for='role-name'>Role Name</Label>
              <InputGroup>
                <Input id='role-name' placeholder='Well Admin' />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md='6' sm='12'>
            <FormGroup>
              <Label for='role-description'>Role Description</Label>
              <InputGroup>
                <Input id='role-description' placeholder='Manages Wells' />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>

        <PermissionsTable />
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={toggleModal} outline>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AddPermissionModal
