import { Alert as ChakraAlert, AlertStatus, AlertTitle, AlertDescription, AlertIcon } from '@chakra-ui/react'

type AlertProps = {
    status: AlertStatus,
    title: string,
    description?: string
}

export default function Alert({ status, title, description } : AlertProps) {
    return (<
        ChakraAlert status={status}>
            <AlertIcon />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </ChakraAlert>
    )
}