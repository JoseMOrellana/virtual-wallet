import { Button, Divider, Heading, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import styled from "styled-components";
import { useVirtualWalletStore } from "../store/virtualWallet";
import FormInput from "../components/FormInput";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { useBalance } from "../hooks/useBalance";
import FormContainer from "../components/FormContainer";
import Alert from "../components/Alert";
import { AxiosError } from "axios";
import TransactionCard from "../components/TransactionCard";
import { Navigate, useLocation } from "react-router-dom";
import { InfoIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

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

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


export default function Balance() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({ defaultValues })
    const user = useVirtualWalletStore(
        (state) => state.user
    )
    const wallet = useVirtualWalletStore(
        (state) => state.wallet
    )
    const loadWallet = useVirtualWalletStore(
        (state) => state.loadWallet
    )
    const mutation = useBalance();

    const onSubmit: SubmitHandler<IFormInput> = (formData) => {
        console.log(formData)

        mutation.mutate(formData, {
            onSuccess: (walletData) => {
                console.log(walletData.data)
                reset(defaultValues)
                loadWallet(walletData.data)
            },
            onError: () => console.log("Error")
        })
    }

    const location = useLocation();

    useEffect(() => {
        // execute on location change
        console.log(location.pathname);
        
        if (location.pathname === "/balance") {
            loadWallet(null)
        }
    }, [location, loadWallet]);

    
    if (!user) return <Navigate replace to="../login" />;

    return (
        <Container>
            <FormContainer>
                <Heading marginBottom={2}>Confirm your identity</Heading>

                {mutation.isError && (
                <Alert status="error" 
                title={
                    mutation.error instanceof AxiosError ? 
                        mutation.error.response?.data.errors ? 
                            mutation.error.response?.data.errors[0].message  
                        : mutation.error.message 
                    : mutation.error.message}  />
            )}

                <FormInput label="Document" errorMessage={errors.document?.message}>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <InfoIcon color='gray.300' />
                        </InputLeftElement>
                        <Input placeholder="Document" {...register("document", { required: "Field is required"})} />
                    </InputGroup>                
                </FormInput>

                <FormInput label="Phone" errorMessage={errors.phone?.message}>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <InfoIcon color='gray.300' />
                        </InputLeftElement>
                        <Input placeholder="Phone" {...register("phone", { required: "Field is required" })} />
                    </InputGroup> 
                    
                </FormInput>
                
                <Button colorScheme="teal" onClick={handleSubmit(onSubmit)} width="100%">Confirm</Button>
            </FormContainer>
            {wallet && (
                <WalletContainer>
                    <Text fontWeight="bold">Wallet: {wallet.wallet._id}</Text>
                    <Text fontWeight="bold">Balance: {USDollar.format(wallet.wallet.balance)}</Text>
                    <Divider marginBottom={4} />
                    <ListContainer>
                        {wallet.transactions.map((transaction) => (
                            <TransactionCard transaction={transaction} key={transaction._id} />
                        ))}
                    </ListContainer>
                    
                </WalletContainer>
            )}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`

const WalletContainer = styled.div`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-left: 8px;
`

const ListContainer = styled.div`
    max-height: 400px;
    overflow-y: scroll;
    padding-right: 4px;
`