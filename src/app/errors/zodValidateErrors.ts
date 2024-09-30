import { ZodError, ZodIssue } from "zod";
import { Errorsource, GenericErrorResponse } from "../random_Interface/terrorsource";

const zodValidateErrors = (error: ZodError): GenericErrorResponse => {
    const errorSource: Errorsource = error.issues.map((i: ZodIssue) => {
        return {
            // finding last index from path
            path: i.path[i?.path.length - 1],
            message: i.message
        }
    }

    )
    const statusCode = 400
    return {
        statusCode,
        message: "our validation error",
        errorSource

    }


}


export default zodValidateErrors