import React from "react"
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"
import { Share, Printer, FileText, Grid, File, Copy } from "react-feather"
import { downloadCSV } from "../../utility/csv"

function TableExportDropdown(props) {
  const { data } = props

  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle color="secondary" caret outline>
        <Share size={15} />
        <span className="align-middle ml-50">Export</span>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem className="w-100">
          <Printer size={15} />
          <span className="align-middle ml-50">Print</span>
        </DropdownItem>
        <DropdownItem className="w-100" onClick={() => downloadCSV(data)}>
          <FileText size={15} />
          <span className="align-middle ml-50">CSV</span>
        </DropdownItem>
        <DropdownItem className="w-100">
          <Grid size={15} />
          <span className="align-middle ml-50">Excel</span>
        </DropdownItem>
        <DropdownItem className="w-100">
          <File size={15} />
          <span className="align-middle ml-50">PDF</span>
        </DropdownItem>
        <DropdownItem className="w-100">
          <Copy size={15} />
          <span className="align-middle ml-50">Copy</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}

export default TableExportDropdown
