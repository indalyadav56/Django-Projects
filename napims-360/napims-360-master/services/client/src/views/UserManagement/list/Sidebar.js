// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addUser } from '../store/action'
import { useDispatch } from 'react-redux'

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [role, setRole] = useState('subscriber')

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      dispatch(
        addUser({
          fullName: values['full-name'],
          company: values.company,
          role,
          phone: values.phone,
          email: values.email,
          status: 'active'
        }, toggleSidebar)
      )
    }
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='full-name'>
            Full Name <span className='text-danger'>*</span>
          </Label>
          <Input
            name='full-name'
            id='full-name'
            placeholder='Musa Ola'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['full-name'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='email'>
            Email <span className='text-danger'>*</span>
          </Label>
          <Input
            type='email'
            name='email'
            id='email'
            placeholder='ola.musa@example.com'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['email'] })}
          />
          <FormText color='muted'>You can use letters, numbers & periods</FormText>
        </FormGroup>

        <FormGroup>
          <Label for='company'>
            Company <span className='text-danger'>*</span>
          </Label>
          <Input
            name='company'
            id='company'
            placeholder='Company Pvt Ltd'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['company'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='phone'>
            Phone # <span className='text-danger'>*</span>
          </Label>
          <Input
            name='phone'
            id='phone'
            placeholder='(397) 294-5153'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['phone'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='user-role'>User Role</Label>
          <Input type='select' id='user-role' name='user-role' value={role} onChange={e => setRole(e.target.value)}>
            <option value='subscriber'>Subscriber</option>
            <option value='editor'>Editor</option>
            <option value='maintainer'>Maintainer</option>
            <option value='author'>Author</option>
            <option value='admin'>Admin</option>
          </Input>
        </FormGroup>

        <Button type='submit' className='mr-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
