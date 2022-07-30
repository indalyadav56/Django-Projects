// ** React Imports
import { Fragment, useState, forwardRef } from 'react'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import {
    Card,
    CardHeader,
    CardTitle,
    Button,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    Label,
    Row,
    Col,
    Badge
} from 'reactstrap'
import Flatpickr from 'react-flatpickr'


// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
    <div className='custom-control custom-checkbox'>
        <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
        <label className='custom-control-label' onClick={onClick} />
    </div>
))

const status = {
    active: { title: 'active', color: 'light-success' },
    inactive: { title: 'Inactive', color: 'light-danger' }
}

const columns = [
    {
        name: 'Date',
        selector: 'date',
        sortable: true,
        maxWidth: '150px'
    },
    {
        name: 'Total Volume of Oil Carried',
        selector: 'volume',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'BSW',
        selector: 'bsw',
        sortable: true,
        minWidth: '150px'
    },
    {
        name: 'Variance on Previous Interval',
        selector: 'variance',
        sortable: true,
        minWidth: '150px'
    }
]

const data = []
let d = 30

for (let i = 0; i < 20; i++) {
    d--
    data.push({
        date: `${d}-07-2021`,
        volume: Math.floor(Math.random() * 10000),
        bsw: Math.floor(Math.random() * 9000),
        variance: Math.floor(Math.random() * 3000)
    })
}

const WellReport = () => {
    // ** States
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [picker, setPicker] = useState(new Date())

    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    // ** Custom Pagination
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={searchValue.length ? filteredData.length / 7 : data.length / 7 || 1}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            nextLinkClassName='page-link'
            nextClassName='page-item next'
            previousClassName='page-item prev'
            previousLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        />
    )

    // ** Converts table to CSV
    function convertArrayOfObjectsToCSV(array) {
        let result

        const columnDelimiter = ','
        const lineDelimiter = '\n'
        const keys = Object.keys(data[0])

        result = ''
        result += keys.join(columnDelimiter)
        result += lineDelimiter

        array.forEach(item => {
            let ctr = 0
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter

                result += item[key]

                ctr++
            })
            result += lineDelimiter
        })

        return result
    }

    // ** Downloads CSV
    function downloadCSV(array) {
        const link = document.createElement('a')
        let csv = convertArrayOfObjectsToCSV(array)
        if (csv === null) return

        const filename = 'export.csv'

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`
        }

        link.setAttribute('href', encodeURI(csv))
        link.setAttribute('download', filename)
        link.click()
    }

    return (
        <Fragment>
            <Card>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Daily Report</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        {/* <Flatpickr
                            value={picker}
                            id='range-picker'
                            className='form-control ml-2'
                            onChange={date => setPicker(date)}
                            options={{
                                mode: 'range',
                                defaultDate: ['2020-02-01', '2020-02-15']
                            }}
                        /> */}

                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ml-50'>Export</span>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className='w-100'>
                                    <Printer size={15} />
                                    <span className='align-middle ml-50'>Print</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                                    <FileText size={15} />
                                    <span className='align-middle ml-50'>CSV</span>
                                </DropdownItem>
                                <DropdownItem className='w-100'>
                                    <Grid size={15} />
                                    <span className='align-middle ml-50'>Excel</span>
                                </DropdownItem>
                                <DropdownItem className='w-100'>
                                    <File size={15} />
                                    <span className='align-middle ml-50'>PDF</span>
                                </DropdownItem>
                                <DropdownItem className='w-100'>
                                    <Copy size={15} />
                                    <span className='align-middle ml-50'>Copy</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>

                    </div>
                </CardHeader>
                
                <DataTable
                    noHeader
                    pagination
                    selectableRows
                    columns={columns}
                    paginationPerPage={7}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    data={searchValue.length ? filteredData : data}
                    selectableRowsComponent={BootstrapCheckbox}
                />
            </Card>
        </Fragment>
    )
}

export default WellReport
