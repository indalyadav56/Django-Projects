import { Row, Col, Badge } from 'reactstrap'
import { Box, Grid } from '../../../assets/styles/general'
import Timeline from '../../../@core/components/timeline'
import { ImageFlowStation, ImageTerminal, ImageWell } from '../../../assets/images/ims/svg'

const timelinedata = [
    {
      title: 'Terminal',
      content: <a href="#">North East Lower Delta Terminal.</a>,
      icon: <img src={ImageTerminal} style={{height: '14px'}} />,
      meta: 'view detail'
    },
    {
        title: 'Flow Line',
        content: <a href="#">Shell Extractor.</a>,
        icon: <img src={ImageFlowStation} style={{height: '14px'}} />,
        meta: 'view detail'
    },
    {
        title: <Badge color='primary'>Current: Well</Badge>,
        content: 'Sink holden Well',
        color: 'secondary',
        icon: <img src={ImageWell} style={{height: '14px'}} />,
        meta: 'view detail'
      },
      {
        title: 'Field',
        content: <a href="#">Badejor Oil Field</a>,
        icon: <img src={ImageFlowStation} style={{height: '14px'}} />,
        meta: 'view detail'
    },
    {
        title: 'Flow Line',
        content: <a href="#">Shell Extractor.</a>,
        icon: <img src={ImageFlowStation} style={{height: '14px'}} />,
        meta: 'view detail'
    }
]
const WellRelationship = props => {

    return <>
        <Box pad="30px">
            <Row>
                <Timeline data={timelinedata} />
            </Row>
        </Box>
    </>
}

export default WellRelationship