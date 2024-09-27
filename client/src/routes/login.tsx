import { Button, Heading, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import Alert from "../components/Alert";
import { AxiosError } from "axios";
import { useVirtualWalletStore } from "../store/virtualWallet";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";

interface IFormInput {
    email: string,
    password: string,
  }

export default function Login() {
    const mutation = useLogin();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (formData) => {

        mutation.mutate(formData, {
            onSuccess: (userData) => {
                console.log(userData)
                loginUser(userData.data)
                navigate("/home")
            }
        })
    }
    const navigate = useNavigate();
    const loginUser = useVirtualWalletStore(
        (state) => state.loginUser
    )

    return (
        <Container>
            <Heading marginBottom={1}>Log In</Heading>

            {mutation.isError && (
                <Alert status="error" 
                title={
                    mutation.error instanceof AxiosError ? 
                        mutation.error.response?.data.errors ? 
                            mutation.error.response?.data.errors[0].message  
                        : mutation.error.message 
                    : mutation.error.message}  />
            )}

            <FormInput label="Email" errorMessage={errors.email?.message}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <EmailIcon color='gray.300' />
                    </InputLeftElement>
                    <Input type="email" placeholder="Email" {...register("email", { required: "Field is required" })} />
                </InputGroup>                
            </FormInput>

            <FormInput label="Password" errorMessage={errors.password?.message}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <LockIcon color='gray.300' />
                    </InputLeftElement>
                    <Input type="password" placeholder="Password" {...register("password", { required: "Field is required" })} />
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
                Log In
            </Button>

            <Link to="/register">Register</Link>
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