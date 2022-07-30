import styled from 'styled-components'

export const Tabheader = styled.div`
    background: none;
    padding: 0 0 0 0;
    margin: 0;
    /* border-top: 1px solid #ccc; */
    border-bottom: 1px solid #ccc;

    & ul.nav-tabs{
        margin: 0 0 -2px 0;
        margin-bottom: 0;
        background: none;
        padding: 0;
        & li a.nav-link{
            padding-bottom: 15px;
        }
    }
`