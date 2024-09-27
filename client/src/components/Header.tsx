import { Image } from '@chakra-ui/react'
import styled from 'styled-components'
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()

    const navigateHome = () => navigate("/home")
    return (
        <Container>
            <Image src={logo} alt="Logo" style={{ width: '300px'}} onClick={navigateHome}/>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
`