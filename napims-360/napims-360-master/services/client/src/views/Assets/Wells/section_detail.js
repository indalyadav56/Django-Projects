import { Row, Col, ListGroupItem, ListGroup } from 'reactstrap'
import { Box, Grid } from '../../../assets/styles/general'


const WellFullDetail = props => {

    return <>
        <Box pad="30px">
            <ListGroup>
            <Row>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>Field</strong> <a href="#">Field name</a></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>Well Type (OP/GI/WI)</strong> <a href="#">Field name</a></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>Well Status</strong> <span>W03948</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>UWI (Unique Well Identifier)</strong> <span>W03948</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>Spud Date</strong> <span>W03948</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>Rig name</strong> <span>W03948</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>Rig type</strong> <span>unknown var</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>Latitude</strong> <span>9.857573</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>Longitude</strong> <span>9.857573</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>Y (mN)</strong> <span>W03948</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>X (mE)</strong> <span>unknown var</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>GL</strong> <span>unknow variable</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>K.B/D.F</strong> <span>W03948</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>MD (FT)</strong> <span>3,200 Feet</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>MSL</strong> <span>unknow variable</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>Target Reservoir</strong> <a href="#">Linked Reservoir</a></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>Total Depth Drilled</strong> <span>W03948</span></Grid>
                </ListGroupItem></Col>
                <Col lg={4}><ListGroupItem>
                    <Grid cols="max-content auto" gap="20px"><strong>TVD (FT)</strong> <span>3,200 Feet</span></Grid>
                </ListGroupItem></Col>
            </Row>
            </ListGroup>
        </Box>
    </>
}

export default WellFullDetail