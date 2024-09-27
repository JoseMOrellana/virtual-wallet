import { Button, Heading, Input, InputGroup, InputLeftElement, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import Alert from "../components/Alert";
import { AxiosError } from "axios";
import FormContainer from "../components/FormContainer";
import { useDeposit } from "../hooks/useDeposit";
import { usePayment } from "../hooks/usePayment";
import { useVirtualWalletStore } from "../store/virtualWallet";

interface IFormInput {
    amount: number,
    type: string,
  }

export default function Transaction() {
    const depositMutation = useDeposit();
    const paymentMutation = usePayment();

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<IFormInput>({ defaultValues: { type: "+"}})
    const onSubmit: SubmitHandler<IFormInput> = (formData) => {

        const mutation = formData.type === "+" ? depositMutation : paymentMutation

        mutation.mutate(formData.amount, {
            onSuccess: (transData) => {
                if (formData.type === "-") {
                    setPaymentSessionToken(transData.data.sessionToken)
                    navigate("../confirmation")
                }
            }
        })
    }
    const navigate = useNavigate();

    const currentType = getValues("type")

    const currentMutation = currentType === "+" ? depositMutation : paymentMutation

    const validateAmount = (amount: number) => {
        if (amount <= 0) return "Amount must be greater than 0" 
    }

    const user = useVirtualWalletStore(
        (state) => state.user
    )
    const setPaymentSessionToken = useVirtualWalletStore(
        (state) => state.setPaymentSessionToken
    )

    if (!user) return <Navigate replace to="../login" />;

    return (
        <FormContainer>
            <Heading marginBottom={1}>Transaction</Heading>

            {currentMutation.isError && (
                <Alert status="error" 
                title={
                    currentMutation.error instanceof AxiosError ? 
                        currentMutation.error.response?.data.errors ? 
                            currentMutation.error.response?.data.errors[0].message  
                        : currentMutation.error.message 
                    : currentMutation.error.message}  />
            )}

            {currentMutation.isSuccess && (
                <Alert status="success" title="Transaction created!"  />
            )}


            <FormInput label="Amount" errorMessage={errors.amount?.message}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none' fontSize='1.2em' color='gray.300'>
                        $
                    </InputLeftElement>
                    <Input type="number" placeholder="Amount" {...register("amount", { required: "Field is required", validate: validateAmount })} />
                </InputGroup>
                
            </FormInput>

            <FormInput label="Type" errorMessage={errors.type?.message}>
                <RadioGroup defaultValue={currentType}>
                    <Stack direction='row'>
                        <Radio value='+' {...register("type")}>Deposit</Radio>
                        <Radio value='-' {...register("type")}>Payment</Radio>
                    </Stack>
                </RadioGroup>
            </FormInput>

            <Button
                isLoading={currentMutation.isPending} 
                colorScheme='teal' 
                variant="solid" 
                width="100%"
                onClick={handleSubmit(onSubmit)}
                marginBottom={3}
            >
                Create
            </Button>

        </FormContainer>
    )
}