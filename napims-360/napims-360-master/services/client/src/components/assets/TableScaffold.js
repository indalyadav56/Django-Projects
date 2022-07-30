import React from "react"
import { Card, CardHeader, CardTitle, Row, Col, Label, Input } from "reactstrap"
import { ChevronDown } from "react-feather"
import TableExportDropdown from "./TableExportDropdown"
import TableToggleAddModalButton from "./ToogleAddModalButton"
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import TableCheckbox from "./TableCheckbox"
import Spinner from '@components/spinner/Loading-spinner'

/**
 *
 * @param {TableScaffoldProps} props
 */
function TableScaffold(props) {
  const {title, data = [], columns, toggleAddModal } = props

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value
    props.setSearch(value)
  }

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      initialSelected={props.currentPage}
      forcePage={props.currentPage}
      onPageChange={props.onPageChange}
      pageCount={props.totalPages}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      nextLinkClassName="page-link"
      nextClassName="page-item next"
      previousClassName="page-item prev"
      previousLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
    />
  )

  return (
    <Card>
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
        <CardTitle tag="h4">{title}</CardTitle>
        <div className="d-flex mt-md-0 mt-1">
          <TableExportDropdown data={[]} />
          <TableToggleAddModalButton onClick={toggleAddModal} />
        </div>
      </CardHeader>
      <Row className="justify-content-end mx-0">
        <Col
          className="d-flex align-items-center justify-content-end mt-1"
          md="6"
          sm="12"
        >
          <Label className="mr-1" for="search-input">
            Search
          </Label>
          <Input
            className="dataTable-filter mb-50"
            type="text"
            bsSize="sm"
            id="search-input"
            value={props.search}
            onChange={handleFilter}
          />
        </Col>
      </Row>
      {
        props.loading ? (
          <Spinner />
        ) : (
          <DataTable
            noHeader
            pagination
            selectableRows
            columns={columns}
            paginationPerPage={props.pageSize}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={1}
            paginationComponent={CustomPagination}
            data={data}
            selectableRowsComponent={TableCheckbox}
          />
        )
      }
    </Card>
  )
}

export default TableScaffold

/**
 * @typedef {{
 * columns: any;
 * data: any;
 * }} TableScaffoldProps
 */
