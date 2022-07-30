import AddNewModal from './AddNewModal'
import TableScaffold from "../../../components/assets/TableScaffold"
import useIsModal from "../../../hooks/assets/useIsModal"
import useTypeQuery from "../../../hooks/assets/useTypeQuery"
import {Badge} from 'reactstrap'

const status = {
  active: { title: 'active', color: 'light-success' },
  inactive: { title: 'Inactive', color: 'light-danger' }
}

const columns = [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
    maxWidth: '150px'
  },
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return (
        <a href="#"><strong>
          {row.name}
        </strong></a>
      )
    }
  },
  {
    name: 'Gross Liquid Capacity',
    selector: 'gross_liquid_capacity',
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'Location',
    selector: 'location',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'OML',
    selector: 'oml',
    sortable: true,
    minWidth: '150px'
  },

  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  }
]

const data = [
  {
    id: 'S001',
    name: 'Storage',
    gross_liquid_capacity: '120000',
    location: 'Usan',
    oml: '101',
    status: 'active'
  },
  {
    id: 'S002',
    name: 'Storage',
    gross_liquid_capacity: '420000',
    location: 'Bonga',
    oml: '23',
    status: 'inactive'
  },
  {
    id: 'S003',
    name: 'Storage',
    gross_liquid_capacity: '320000',
    location: 'Usan',
    oml: '45',
    status: 'active'
  },  {
    id: 'S004',
    name: 'Storage',
    gross_liquid_capacity: '430000',
    location: 'Usan',
    oml: '43',
    status: 'inactive'
  },
  {
    id: 'S005',
    name: 'Storage',
    gross_liquid_capacity: '530000',
    location: 'Bonga',
    oml: '150',
    status: 'active'
  }
  
]
const Storage_Tanks = () => {
  const { isModal, toggleModal } = useIsModal()

  const {} = useTypeQuery({ variables: { name: "StorageTankType" }, skip: !isModal })

  return (
    <>
      <TableScaffold
        title="Storage Tanks"
        columns={columns}
        data={data}
        toggleAddModal={toggleModal}
      />
      <AddNewModal isOpen={isModal} toggle={toggleModal} />
    </>
  )
}

export default Storage_Tanks
