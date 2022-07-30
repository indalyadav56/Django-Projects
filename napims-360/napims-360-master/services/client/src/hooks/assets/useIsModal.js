import React from "react"

function useIsModal(props) {
  const [isModal, setIsModal] = React.useState(false)
  const toggleModal = () => setIsModal((m) => !m)
  return { isModal, toggleModal, setIsModal }
}

export default useIsModal