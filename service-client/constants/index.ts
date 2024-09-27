export enum HttpCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum ResponseMessages {
    UNAUTHORIZED = 'Unauthorized!',
    USER_NOT_FETCHED = 'User data could not be fetched!',
    WALLET_NOT_FETCHED = 'Wallet data could not be fetched',
    MISSING_FIELDS = 'Missing or empty required fields in request!',
    INCORRECT_DATA = 'Incorrect data!',
    PAYMENT_AMOUNT_GREATER = 'Payment amount surpasses wallet amount',
    TRANSACTION_NOT_PENDING = 'Transaction is no longer pending!',
    TRANSACTION_NOT_FOUND = 'Transaction not found!',
    GREATER_THAN_ZERO = 'Amount must be greater than zero!',
}
