export type Errorsource = {
    path: string | number,
    message: string
}[]

export type GenericErrorResponse = {
    statusCode: number,
    message: string,
    errorSource: Errorsource
}