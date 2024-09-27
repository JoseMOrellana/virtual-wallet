import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styled from "styled-components";

export default function Root() {
    const location = useLocation();
    
    if (location.pathname === "/") return <Navigate replace to="../home" />;

    return (
        <Container>
            <Header />
            <Outlet />
            <Footer />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100vh
`