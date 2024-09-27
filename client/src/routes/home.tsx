import { Button, Heading } from "@chakra-ui/react";
import styled from "styled-components";
import { useVirtualWalletStore } from "../store/virtualWallet";
import { useNavigate, Navigate } from "react-router-dom";



export default function Home() {
    const user = useVirtualWalletStore(
        (state) => state.user
    )
    const logout = useVirtualWalletStore(
        (state) => state.logout
    )
    const navigate = useNavigate();

    const navigateToBalance = () => navigate("../balance")

    const navigateToTransaction = () => navigate("../transaction")

    const handleLogout = () => logout()

    if (!user) return <Navigate replace to="../login" />;

    return (
        <Container>
            <Heading>Welcome, {user.name}</Heading>
            <ButtonContainer>
                <Button colorScheme="green" margin={4} onClick={navigateToBalance}>My balance</Button>
                <Button colorScheme="teal" margin={4} onClick={navigateToTransaction}>New Transaction</Button>
                <Button colorScheme="blue" margin={4} onClick={handleLogout}>Log out</Button>
            </ButtonContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
`

const ButtonContainer = styled.div`
    display: flex;
`