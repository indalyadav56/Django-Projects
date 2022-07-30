// ** React Imports
import AddNewModal from './AddNewModal'
import TableScaffold from "../../../components/assets/TableScaffold"
import useIsModal from "../../../hooks/assets/useIsModal"
import useTypeQuery from "../../../hooks/assets/useTypeQuery"

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
    name: 'Company',
    selector: 'company',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Terrain',
    selector: 'terrain',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Capacity',
    selector: 'capacity',
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
    id: 'EG0012',
    name: 'Storage',
    company: 'SPDC',
    terrain: 'Swamp',
    capacity: 49000,
    status: 'active'
  },
  {
    id: 'EG0015',
    name: 'Storage',
    company: 'Eroton',
    terrain: 'Swamp',
    capacity: 49000,
    status: 'active'
  },
  {
    id: 'EG0016',
    name: 'Storage',
    company: 'SNPECO',
    terrain: 'Swamp',
    capacity: 90000,
    status: 'inactive'
  },
  {
    id: 'EG0017',
    name: 'Storage',
    company: 'Total',
    terrain: 'Swamp',
    capacity: 400000,
    status: 'active'
  },
  {
    id: 'EG0018',
    name: 'Storage',
    company: 'Aieto',
    terrain: 'Swamp',
    capacity: 290000,
    status: 'inactive'
  }
  
]
const EGTL_Storages = () => {
  const { isModal, toggleModal } = useIsModal()

  const {} = useTypeQuery({ variables: { name: "EGTLType" }, skip: !isModal })

  return (
    <>
      <TableScaffold
        title="EGTL Storages"
        columns={columns}
        data={data}
        toggleAddModal={toggleModal}
      />
      <AddNewModal isOpen={isModal} toggle={toggleModal} />
    </>
  )
}

export default EGTL_Storages
