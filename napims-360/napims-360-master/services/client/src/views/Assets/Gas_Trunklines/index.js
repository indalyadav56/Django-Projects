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
    name: 'Tag No.',
    selector: 'tag_no',
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
    id: 'GT001',
    name: 'Trunkline',
    company: 'SPDC',
    terrain: 'Swamp',
    tag_no: '5432',
    status: 'active'
  },
  {
    id: 'GT002',
    name: 'Trunkline',
    company: 'Eroton',
    terrain: 'Swamp',
    tag_no: '4353',
    status: 'active'
  },
  {
    id: 'GT003',
    name: 'Trunkline',
    company: 'SNPECO',
    terrain: 'Swamp',
    tag_no: '1244',
    status: 'inactive'
  },
  {
    id: 'GT004',
    name: 'Trunkline',
    company: 'Total',
    terrain: 'Swamp',
    tag_no: '4353',
    status: 'active'
  },
  {
    id: 'GT005',
    name: 'Trunkline',
    company: 'Aieto',
    terrain: 'Swamp',
    tag_no: '9832',
    status: 'inactive'
  }
  
]
const Gas_Trunklines = () => {
  const { isModal, toggleModal } = useIsModal()

  const {} = useTypeQuery({ variables: { name: "GasTrunklineType" }, skip: !isModal })

  return (
    <>
      <TableScaffold
        title="Gas Trunklines"
        columns={columns}
        data={data}
        toggleAddModal={toggleModal}
      />
      <AddNewModal isOpen={isModal} toggle={toggleModal} />
    </>
  )
}

export default Gas_Trunklines
