import {userErrorMessage} from "../types/error.type"
import { jsonValidationError } from "../types/http.types"

export class ErrorCodes {
    static get GENERAL_ERROR(): userErrorMessage {
        return {
            message: "GENERAL ERROR",
            action: "action message",
            innerMessage: "inner message",
        }
    }
    static get TOKEN_ABSENT(): userErrorMessage {
        return {
            message: "TOKEN ABSENT",
            action: "Please provide a valid user token",
            innerMessage: "no token provided",
        }
    }
    static get INVALID_TOKEN(): userErrorMessage {
        return {
            message: "INVALID TOKEN",
            action: "Please use a valid user token",
            innerMessage: "token is incorrect",
        }
    }
    static get USER_NOT_DEFINED(): userErrorMessage {
        return {
            message: "USER NOT DEFINED",
            action: "Internal error",
            innerMessage:
                "Middleware used incorrectly. It requeires defined user in req.user",
        }
    }

    static JSON_VALIDATION_FAILED({action, param}: jsonValidationError): userErrorMessage {
        return {
            message: "JSON VALIDATION FAILED",
            action,
            innerMessage: `User sent wrong ${param}`,
        }
    }
}
