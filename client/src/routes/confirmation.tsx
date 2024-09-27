import { Button, Input } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import FormInput from "../components/FormInput";
import Alert from "../components/Alert";
import { AxiosError } from "axios";
import { useVirtualWalletStore } from "../store/virtualWallet";
import { useConfirmation } from "../hooks/useConfirmation";

interface IFormInput {
    code: string,
  }

export default function Confirmation() {
    const mutation = useConfirmation();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (formData) => {

        mutation.mutate({ paymentToken: formData.code, sessionToken: paymentSessionToken}, {
            onSuccess: (data) => {
                console.log(data)
            }
        })
    }
    const user = useVirtualWalletStore(
        (state) => state.user
    )
    const paymentSessionToken = useVirtualWalletStore(
        (state) => state.paymentSessionToken
    )

    if (!user) return <Navigate replace to="../login" />;

    return (
        <Container>
            
            <Alert status="warning" title="Check your email for the payment code!"  />

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
                <Alert status="success" title="Payment validated!"  />
            )}

            <FormInput label="Code" errorMessage={errors.code?.message}>
                <Input placeholder="Code" {...register("code", { required: "Field is required" })} />
            </FormInput>

            <Button
                isLoading={mutation.isPending} 
                colorScheme='teal' 
                variant="solid" 
                width="100%"
                onClick={handleSubmit(onSubmit)}
                marginBottom={3}
            >
                Confirm
            </Button>

        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`