import { Breadcrumb, BreadcrumbItem, Row, Col, Container, Card, CardBody, CardTitle, ListGroup, ListGroupItem, Badge, InputGroup, InputGroupAddon, InputGroupText, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { useState } from 'react'
import { Box, Grid, Spacer, Avatar } from '../../../assets/styles/general'
import { Tabheader } from '../../../assets/styles/tab'
import wellImage from '../../../assets/images/ims/Well.png'
import WellFullDetail from './section_detail'
import WellRelationship from './section_timeline'
import WellReport from './section_report'

const WellDetail = props => {
    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }
    return <>
        <Breadcrumb>
            <BreadcrumbItem>
                <a href="/configuration">Configurations </a>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <a href="/assets"> Assets</a>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <span> Wells: well name</span>
            </BreadcrumbItem>
        </Breadcrumb>
        <div style={{ height: '20px' }} />
        <Container fluid>
            <Card>
                <CardBody className=''>
                    <h4 color='primary'>Well: Asset Details</h4>
                    <Spacer space="20px" />
                    <Box minHeight="220px">
                        <Row>
                            <Col lg='3'>
                                <Avatar size="200px" bg="#eee"><img src={wellImage} /></Avatar>
                            </Col>
                            <Col lr='9'>
                                <Grid cols="max-content auto" gap="10px 20px">
                                    <div><strong>Asset Name</strong></div><div>Something something well</div>
                                    <div><strong>Status</strong></div><div><Badge color="light-primary">Active</Badge></div>
                                    <div><strong>Company</strong></div><div>Faisal and Sons Oil and Gas</div>
                                    <div><strong>Terrain</strong></div><div>Lower Delta 4</div>
                                    <div><strong>Oml</strong></div><div>toreme cert</div>
                                </Grid>
                            </Col>
                        </Row>
                    </Box>
                </CardBody>
                <Tabheader>
                    <Nav tabs className="subElement">
                        <NavItem>
                            <NavLink active={active === '1'}
                                onClick={() => {
                                    toggle('1')
                                }}>
                                Asset Details
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active={active === '2'}
                                onClick={() => {
                                    toggle('2')
                                }}>
                                Links &amp; Relationships
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active={active === '3'}
                                onClick={() => {
                                    toggle('3')
                                }}>
                                Reports
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Tabheader>
                <TabContent activeTab={active}>
                    <TabPane tabId='1'>
                        <WellFullDetail />
                    </TabPane>
                    <TabPane tabId='2'>
                        <Box pad="30px">
                          <WellRelationship />
                        </Box>
                    </TabPane>
                    <TabPane tabId='3'>
                        <Box pad="30px">
                            <WellReport />
                        </Box>
                    </TabPane>
                </TabContent>
            </Card>
        </Container>
    </>
}

export default WellDetail