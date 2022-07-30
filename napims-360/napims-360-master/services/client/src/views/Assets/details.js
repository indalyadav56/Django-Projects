import { Suspense, lazy } from 'react'
import { Route } from 'react-router-dom'

import Assets from './index'
import { AssetRouteEnum } from '../../constants/assets'

const ROUTES = [
  {
    path: `${AssetRouteEnum.WELLS}/:id`,
    component: lazy(() => import("./Wells/detail"))
  },
  {
    path: `/assets`,
    component: lazy(() => import("./index"))
  }
]

export default function details() {
  return (
    <>
      <Suspense>
        {ROUTES.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Suspense>
    </>
  )
}
