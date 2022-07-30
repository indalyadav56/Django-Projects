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
    id: 'NAG001',
    name: 'Station',
    company: 'SPDC',
    terrain: 'Swamp',
    oml: '109',
    status: 'active'
  },
  {
    id: 'NAG008',
    name: 'Station',
    company: 'Eroton',
    terrain: 'Swamp',
    oml: '46',
    status: 'active'
  },
  {
    id: 'NAG003',
    name: 'Station',
    company: 'SNPECO',
    terrain: 'Swamp',
    oml: '33',
    status: 'inactive'
  },
  {
    id: 'NAG002',
    name: 'Station',
    company: 'Total',
    terrain: 'Swamp',
    oml: '54',
    status: 'active'
  },
  {
    id: 'NAG009',
    name: 'Station',
    company: 'Aieto',
    terrain: 'Swamp',
    oml: '43',
    status: 'inactive'
  }
  
]
const NAG_Compressor_Stations = () => {
  const { isModal, toggleModal } = useIsModal()

  const {} = useTypeQuery({ variables: { name: "NAGCompressorStationType" }, skip: !isModal })

  return (
    <>
      <TableScaffold
        title="NAG Compressor Stations"
        columns={columns}
        data={data}
        toggleAddModal={toggleModal}
      />
      <AddNewModal isOpen={isModal} toggle={toggleModal} />
    </>
  )
}

export default NAG_Compressor_Stations
