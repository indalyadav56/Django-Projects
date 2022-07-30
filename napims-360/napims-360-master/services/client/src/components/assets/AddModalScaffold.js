import React from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import { X } from "react-feather"

/**
 *
 * @param {AssetAddModalScaffoldProps} props
 */
function AssetAddModalScaffold(props) {
  const { title, children, toggle, ...rest } = props

  return (
    <Modal
      className="sidebar-sm"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
      toggle={toggle}
      {...rest}
    >
      <ModalHeader
        toggle={toggle}
        close={<X className="cursor-pointer" size={15} onClick={toggle} />}
      >
        {title}
      </ModalHeader>
      <ModalBody className='flex-grow-1'>{children}</ModalBody>
    </Modal>
  )
}

export default AssetAddModalScaffold

/**
 * @typedef {{
 * title: string;
 * } & React.ComponentPropsWithoutRef<typeof import('reactstrap').Modal>} AssetAddModalScaffoldProps
 */
