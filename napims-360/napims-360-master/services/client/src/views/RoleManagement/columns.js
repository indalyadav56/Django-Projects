// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { deleteRole, getRole } from './store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather'

export const columns = [
  {
    name: 'Role Name',
    minWidth: '297px',
    selector: 'fullName',
    sortable: true,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
          <Link
            to={`/ums/view/${row.id}`}
            className='user-name text-truncate mb-0'
            onClick={() => store.dispatch(getRole(row.id))}
          >
            <span className='font-weight-bold'>{row.fullName}</span>
          </Link>
      </div>
    )
  },
  {
    name: 'Descriptions',
    minWidth: '138px',
    selector: 'description',
    sortable: true,
    cell: () => <div>lorem ipsum</div>
  },
  {
    name: 'Number of Users',
    minWidth: '138px',
    selector: 'num_users',
    sortable: true,
    cell: () => <div>14</div>
  },
  {
    name: 'Date Created',
    minWidth: '138px',
    selector: 'created_at',
    sortable: true,
    cell: () => <div>10 Feb, 2021</div>
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <UncontrolledDropdown>
        <DropdownToggle tag='div' className='btn btn-sm'>
          <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/ums/view/${row.id}`}
            className='w-100'
            onClick={() => store.dispatch(getRole(row.id))}
          >
            <FileText size={14} className='mr-50' />
            <span className='align-middle'>View</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to={`/ums/edit/${row.id}`}
            className='w-100'
            onClick={() => store.dispatch(getRole(row.id))}
          >
            <Archive size={14} className='mr-50' />
            <span className='align-middle'>Edit</span>
          </DropdownItem>
          <DropdownItem className='w-100' onClick={() => store.dispatch(deleteRole(row.id))}>
            <Trash2 size={14} className='mr-50' />
            <span className='align-middle'>Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
]
