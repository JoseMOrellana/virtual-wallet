import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react"

type InputProps = {
    label?: string,
    errorMessage?: string,
    children: React.ReactNode
}

export default function FormInput({ label, errorMessage, children }: InputProps) {
    return (
        <FormControl isInvalid={errorMessage !== undefined} marginBottom={3}>
            <FormLabel marginBottom={0}>{label}</FormLabel>
            {children}
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
    )
}

