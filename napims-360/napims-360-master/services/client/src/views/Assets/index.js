import React from "react"
import { Breadcrumb, BreadcrumbItem, Row, Col, Container } from "reactstrap"
import AssetComponentList from "./List"
import { AssetRouteEnum } from "../../constants/assets"
import { Route } from "react-router-dom"
import Suspense from "../../components/Suspense"

const ROUTES = [
  {
    path: AssetRouteEnum.FIELDS,
    component: React.lazy(() => import("./Fields"))
  },
  {
    exact: true,
    path: ["/assets", AssetRouteEnum.ASSET_GROUPS],
    component: React.lazy(() => import("./Groups"))
  },
  {
    path: AssetRouteEnum.COMPANIES,
    component: React.lazy(() => import("./Companies"))
  },
  {
    path: AssetRouteEnum.OMLS,
    component: React.lazy(() => import("./OML"))
  },
  {
    path: AssetRouteEnum.RESERVOIRS,
    component: React.lazy(() => import("./Reservoirs"))
  },
  {
    path: AssetRouteEnum.WELLS,
    component: React.lazy(() => import("./Wells"))
  },
  {
    path: AssetRouteEnum.FLOWLINES,
    component: React.lazy(() => import("./Flowlines"))
  },
  {
    path: AssetRouteEnum.TERMINALS,
    component: React.lazy(() => import("./Terminals"))
  },
  {
    path: AssetRouteEnum.FPSO,
    component: React.lazy(() => import("./FPSO"))
  },
  {
    path: AssetRouteEnum.FSO,
    component: React.lazy(() => import("./FSO"))
  },
  {
    path: AssetRouteEnum.STORAGE_TANKS,
    component: React.lazy(() => import("./Storage_Tanks"))
  },
  {
    path: AssetRouteEnum.LACT_POINTS,
    component: React.lazy(() => import("./Lact_Points"))
  },
  {
    path: AssetRouteEnum.PIPELINES,
    component: React.lazy(() => import("./Pipelines"))
  },
  {
    path: AssetRouteEnum.DELIVERY_LINES,
    component: React.lazy(() => import("./Delivery_Lines"))
  },
  {
    path: AssetRouteEnum.TRUNKLINES,
    component: React.lazy(() => import("./Trunklines"))
  },
  {
    path: AssetRouteEnum.PLATFORMS,
    component: React.lazy(() => import("./Platforms"))
  },
  {
    path: AssetRouteEnum.FLOWSTATION,
    component: React.lazy(() => import("./Flowstations"))
  },
  // {
  //   path: AssetRouteEnum.GAS_MARKETS,
  //   component: React.lazy(() => import("./Gas_Trunklines"))
  // },
  {
    path: AssetRouteEnum.NGL_STORAGE,
    component: React.lazy(() => import("./NAG_Compressor_Stations"))
  },
  {
    path: AssetRouteEnum.EGTL_STORAGE,
    component: React.lazy(() => import("./EGTL_Storages"))
  },
  {
    path: AssetRouteEnum.LPG_STORAGE,
    component: React.lazy(() => import("./LPG_Storages"))
  },
  // {
  //   path: AssetRouteEnum.GAS_PLANTS,
  //   component: React.lazy(() => import("./Gas_Trunklines"))
  // }
  {
    path: AssetRouteEnum.AGG_STATIONS,
    component: React.lazy(() => import("./AGG_Stations"))
  },
  {
    path: AssetRouteEnum.GAS_PROCESSING_PLANTS,
    component: React.lazy(() => import("./Gas_Processing_Facilities"))
  },
  {
    path: AssetRouteEnum.NAG_COMPRESSORS,
    component: React.lazy(() => import("./NAG_Compressor_Stations"))
  },
  {
    path: AssetRouteEnum.GAS_TRUNKLINES,
    component: React.lazy(() => import("./Gas_Trunklines"))
  }
]

const Assets = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="#">System Configurations</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href="#">Configurations</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <span>Assets</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <div style={{ height: "20px" }} />
      <Container fluid>
        <Row className="">
          <Col lg="3" sm={{ hide: true }}>
            <AssetComponentList />
          </Col>
          <Col lg="9" sm="12">
            <Suspense>
              {ROUTES.map((route) => (
                <Route exact key={route.path} {...route} />
              ))}
            </Suspense>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Assets
