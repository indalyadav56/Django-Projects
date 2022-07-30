import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Box = styled.div`
    background: ${props => props.bg};
    padding: ${props => props.pad};
    margin: ${props => props.mag};
    min-height: ${props => props.minHeight};
`

export const Grid = styled.div`
    display: grid;
    grid-template-columns: ${props => props.cols};
    grid-gap: ${props => props.gap};
`

export const Avatar = styled.div`
    height: ${props => props.size};
    border-radius: ${props => props.radius};
    background: ${props => props.bg};
    text-align: center;
    & img{
        height: 100%;
    }
`
Avatar.defaultProps = {
    size: '100px',
    radius: '10px',
    bg: '#fefefe'
}
Avatar.propTypes = {
    size: PropTypes.string,
    radius: PropTypes.string,
    bg: PropTypes.string
}

export const Spacer = styled.div`
    height: ${props => props.space};
`
Spacer.defaultProps = {
    space: '10px'
}
Spacer.propTypes = {
    space: PropTypes.string
}
  