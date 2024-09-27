import { Button, Heading, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import styled from "styled-components"
import FormInput from "../components/FormInput"
import { Link } from "react-router-dom"
import { useRegister } from "../hooks/useRegister"
import { useForm, SubmitHandler, DefaultValues } from "react-hook-form"
import Alert from "../components/Alert"
import {AxiosError} from 'axios'
import { EmailIcon, InfoIcon, LockIcon, PhoneIcon } from "@chakra-ui/icons"

interface IFormInput {
    name: string,
    document: string,
    phone: string,
    email: string,
    password: string,
    confirmPassword: string
  }

const defaultValues: DefaultValues<IFormInput> = {
    name: "",
    document: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export default function Register() {
    const mutation = useRegister();
    const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm<IFormInput>({ defaultValues })
    const onSubmit: SubmitHandler<IFormInput> = (data) => {

        mutation.mutate(data, {
            onSuccess: () => {
                reset(defaultValues)
            }
        })
    }

    const validatePassword = (confirmPassword: string) => {
        const password = getValues("password")
        if (password !== confirmPassword) return "Passwords don't match"
    }

    return (
        <Container>
            <Heading marginBottom={1}>Sign Up</Heading>
            
            {mutation.isError && (
                <Alert status="error" 
                title={
                    mutation.error instanceof AxiosError ? 
                        mutation.error.response?.data.errors ? 
                            mutation.error.response?.data.errors[0].message  
                        : mutation.error.message 
                    : mutation.error.message}  />
            )}
            {mutation.isSuccess && (
                <Alert status="success" title="Signin completed!"  />
            )}

            <FormInput label="Name" errorMessage={errors.name?.message}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <InfoIcon color='gray.300' />
                    </InputLeftElement>
                    <Input placeholder="Name" {...register("name", { required: "Field is required", minLength: { value: 2, message: "Must be greater than 1"}})} />
                </InputGroup> 
                
            </FormInput>

            <FormInput label="Document" errorMessage={errors.document?.message}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <InfoIcon color='gray.300' />
                    </InputLeftElement>
                    <Input placeholder="Document" {...register("document", { required: "Field is required", minLength: { value: 4, message: "Must be greater than 3"}})} />
                </InputGroup>            
            </FormInput>

            <FormInput label="Phone" errorMessage={errors.phone?.message}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <PhoneIcon color='gray.300' />
                    </InputLeftElement>
                    <Input placeholder="Phone" {...register("phone", { required: "Field is required", minLength: { value: 8, message: "Must be greater than 7"}})} />
                </InputGroup>         
            </FormInput>

            <FormInput label="Email" errorMessage={errors.email?.message}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <EmailIcon color='gray.300' />
                    </InputLeftElement>
                    <Input type="email" placeholder="Email" {...register("email", { required: "Field is required", pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Not a valid email"} })} />
                </InputGroup>
            </FormInput>

            <FormInput label="Password" errorMessage={errors.password?.message}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <LockIcon color='gray.300' />
                    </InputLeftElement>
                    <Input type="password" placeholder="Password" {...register("password", { required: "Field is required", minLength: { value: 8, message: "Must be greater than 7"}})} />
                </InputGroup>      
            </FormInput>

            <FormInput label="Confirm Password" errorMessage={errors.confirmPassword?.message}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <LockIcon color='gray.300' />
                    </InputLeftElement>
                    <Input type="password" placeholder="Confirm Password" {...register("confirmPassword", { required: "Field is required", validate: validatePassword })}/>
                </InputGroup> 
                
            </FormInput>

            <Button
                isLoading={mutation.isPending} 
                colorScheme='teal' 
                variant="solid" 
                width="100%"
                onClick={handleSubmit(onSubmit)}
                marginBottom={3}
            >
                Sign Up
            </Button>

            <Link to="/login">Log In</Link>
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