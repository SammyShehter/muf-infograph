import {validationResult} from "express-validator"
import {Request, Response, NextFunction} from "express"
import {handleError} from "./common.utils"
import {ErrorCodes} from "./error.utils"

export default class CommonValidator {
    customValidationResult = validationResult.withDefaults({
        formatter: ({msg, param}) => {
            return ErrorCodes.JSON_VALIDATION_FAILED({
                action: msg,
                param,
            })
        },
    })

    validate = (validations: any) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            for (const validation of validations) {
                const result = await validation.run(req)
                if (result.errors.length) break
            }

            const errors = this.customValidationResult(req)
            return errors.isEmpty()
                ? next()
                : handleError(errors.array()[0], req, res)
        }
    }
}
