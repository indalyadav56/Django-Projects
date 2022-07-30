import { useState } from "react"
import { Instagram, Search } from "react-feather"
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Badge,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap"
import { AssetRouteEnum } from "../../constants/assets"
import { NavLink } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { LOAD_ASSETS_TOTAL } from "../../graphql/queries"

export const assetArray = [
  {
    name: "Asset Groups",
    icon: <Instagram size={12} />,
    queryKey: 'assetGroup',
    to: AssetRouteEnum.ASSET_GROUPS,
    isActive: (match, location) => {
      if (match && match.url === AssetRouteEnum.ASSET_GROUPS) {
        return true
      } 
      if (location.pathname === '/assets') {
        return true
      } 
      return false
    }
  },
  {
    name: "Companies",
    queryKey: 'company',
    icon: <Instagram size={12} />,
    to: AssetRouteEnum.COMPANIES
  },
  {
    name: "Fields",
    icon: <Instagram size={12} />,
    queryKey: 'oilField',
    to: AssetRouteEnum.FIELDS
  },
  {
    name: "Wells",
    icon: <Instagram size={12} />,
    queryKey: 'well',
    to: AssetRouteEnum.WELLS
  },
  {
    name: "Reservoirs",
    icon: <Instagram size={12} />,
    queryKey: 'reservoir',
    to: AssetRouteEnum.RESERVOIRS
  },
  {
    name: "Terminals",
    icon: <Instagram size={12} />,
    queryKey: 'terminal',
    to: AssetRouteEnum.TERMINALS
  },
  {
    name: "FPSO",
    icon: <Instagram size={12} />,
    queryKey: 'fpso',
    to: AssetRouteEnum.FPSO
  },
  {
    name: "FSO",
    icon: <Instagram size={12} />,
    queryKey: 'fso',
    to: AssetRouteEnum.FSO
  },
  {
    name: "OML",
    icon: <Instagram size={12} />,
    queryKey: 'oml',
    to: AssetRouteEnum.OMLS
  },
  {
    name: "Flowlines",
    icon: <Instagram size={12} />,
    queryKey: 'flowline',
    to: AssetRouteEnum.FLOWLINES
  },
  {
    name: "Lact Points",
    icon: <Instagram size={12} />,
    queryKey: 'lactpoint',
    to: AssetRouteEnum.LACT_POINTS
  },
  {
    name: "Pipelines",
    icon: <Instagram size={12} />,
    queryKey: 'pipeline',
    to: AssetRouteEnum.PIPELINES
  },
  {
    name: "Delivery Lines",
    icon: <Instagram size={12} />,
    queryKey: 'deliveryline',
    to: AssetRouteEnum.DELIVERY_LINES
  },
  {
    name: "Trunklines",
    icon: <Instagram size={12} />,
    queryKey: 'trunkline',
    to: AssetRouteEnum.TRUNKLINES
  },
  {
    name: "Platforms",
    icon: <Instagram size={12} />,
    queryKey: 'platform',
    to: AssetRouteEnum.PLATFORMS
  },
  {
    name: "Flowstation",
    icon: <Instagram size={12} />,
    queryKey: 'station',
    to: AssetRouteEnum.FLOWSTATION
  },
  {
    name: "AGG Station",
    icon: <Instagram size={12} />,
    queryKey: 'agg',
    to: AssetRouteEnum.AGG_STATIONS
  }
]

function AssetComponentList(props) {
  const [assetList, setAssetList] = useState(assetArray)
  const { data } = useQuery(LOAD_ASSETS_TOTAL)

  const onSearch = (val) => {
    const searchText = val.target.value.toLowerCase()
    const result =
      searchText.length < 1 ? assetArray : assetArray.filter((elem) => elem.name.toLowerCase().includes(searchText)
          )

    setAssetList(result)
  }

  return (
    <Card className="scroll-card">
      <CardHeader>
        <CardTitle>ASSET LIST</CardTitle>
      </CardHeader>
      <CardBody>
        <InputGroup className="mb-2">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <Search size={14} />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="search..." onChange={onSearch} />
        </InputGroup>
        <ListGroup>
          {assetList.map(({ name, count, queryKey, icon, ...rest }, index) => {
            return (
              <ListGroupItem
                key={`${name}-${index}`}
                tag={NavLink}
                className="d-flex justify-content-between align-items-center"
                {...rest}
              >
                <span className="mr-1">{icon}</span>
                <span style={{ flexGrow: 1 }}>{name}</span>
                <Badge color="primary" pill>
                  {data?.[queryKey]?.total}
                </Badge>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </CardBody>
    </Card>
  )
}

export default AssetComponentList
