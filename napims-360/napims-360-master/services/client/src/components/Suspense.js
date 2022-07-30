import React from "react"
import Spinner from "../@core/components/spinner/Loading-spinner"

/**
 *
 * @param {React.SuspenseProps} props
 */
function Suspense(props) {
  return <React.Suspense fallback={<Spinner />} {...props} />
}

export default Suspense
