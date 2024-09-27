import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link, Text } from '@chakra-ui/react'
import styled from 'styled-components'

export default function Footer() {
    return (
        <Container>
            <Text fontWeight="bold">
                Developed by 
                <Link href='https://www.linkedin.com/in/josem-orellanam/' isExternal>
                    {' '}José Orellana <ExternalLinkIcon mx='2px' />
                </Link>
            </Text>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #ccc;
    margin: 8px 0;
    padding: 8px;
`