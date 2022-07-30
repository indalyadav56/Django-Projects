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
    id: 'GP001',
    name: 'Facility',
    company: 'SPDC',
    terrain: 'Swamp',
    capacity: 49000,
    status: 'active'
  },
  {
    id: 'GP002',
    name: 'Facility',
    company: 'Eroton',
    terrain: 'Swamp',
    capacity: 49000,
    status: 'active'
  },
  {
    id: 'GP003',
    name: 'Facility',
    company: 'SNPECO',
    terrain: 'Swamp',
    capacity: 90000,
    status: 'inactive'
  },
  {
    id: 'GP004',
    name: 'Facility',
    company: 'Total',
    terrain: 'Swamp',
    capacity: 400000,
    status: 'active'
  },
  {
    id: 'GP005',
    name: 'Facility',
    company: 'Aieto',
    terrain: 'Swamp',
    capacity: 290000,
    status: 'inactive'
  }
  
]
const Gas_Processing_Facilities = () => {
  const { isModal, toggleModal } = useIsModal()

  const {} = useTypeQuery({ variables: { name: "GasProcessingFacilityType" }, skip: !isModal })

  return (
    <>
      <TableScaffold
        title="Gas Processing Facilities"
        columns={columns}
        data={data}
        toggleAddModal={toggleModal}
      />
      <AddNewModal isOpen={isModal} toggle={toggleModal} />
    </>
  )
}

export default Gas_Processing_Facilities
