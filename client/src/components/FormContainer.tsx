import styled from "styled-components"

type FormContainerProps = {
    children: React.ReactNode
}

export default function FormContainer({children} : FormContainerProps) {
    return (
        <Container>
            {children}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    padding: 32px;
    border: 1px solid #ccc;
    border-radius: 8px
`