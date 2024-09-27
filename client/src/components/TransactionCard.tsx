import { Card, CardBody, Text } from "@chakra-ui/react";
import { TransactionsInfo } from "../store/types";
import dayjs from "dayjs"
import styled from "styled-components";
import { useVirtualWalletStore } from "../store/virtualWallet";
import { useNavigate } from "react-router-dom";

type TransactionCardProps = {
    transaction: TransactionsInfo
}

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function TransactionCard({ transaction } : TransactionCardProps) {
    const { _id, updatedAt, status, type, amount } = transaction

    const setPaymentSessionToken = useVirtualWalletStore(
        (state) => state.setPaymentSessionToken
    )
    const navigate = useNavigate()

    const isClickable = transaction.status === "PENDING" && transaction.type === "-"

    const handleClick = () => {
            setPaymentSessionToken(transaction.sessionToken)
            navigate("../confirmation")
        }

    return (
        <Card variant="outline" marginBottom={2} cursor={isClickable ? "pointer" : "default"} onClick={isClickable ? handleClick : () => {}}>
            <CardBody>
                <RowContainer>
                    <ColumnContainer>
                        <Text fontWeight="bold">{_id}</Text>
                        <Text>{dayjs(updatedAt).format('MM/DD/YYYY')}</Text>
                        <Text>{status}</Text>
                    </ColumnContainer>
                    <ColumnContainer>
                        <Text fontWeight="bold" textAlign="end">{type}</Text>
                        <Text fontWeight="bold" textAlign="end">{USDollar.format(amount)}</Text>
                    </ColumnContainer>
                </RowContainer>
            </CardBody>
        </Card>
    )
}

const RowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 400px
`

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between
`