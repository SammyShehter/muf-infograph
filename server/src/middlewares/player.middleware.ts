import {Request, Response, NextFunction} from "express"
import {body} from "express-validator"
import {handleError} from "../utils/common.utils"
import CommonValidator from "../utils/common.validator"
import {ErrorCodes} from "../utils/error.utils"

class PlayerMiddleware extends CommonValidator {
    constructor() {
        super()
        console.log("PlayerMiddleware instance created")
    }

    newPlayerChecks = this.validate([
        body("name")
            .exists()
            .withMessage(`Please add name to the player: req.body.name`)
            .notEmpty()
            .withMessage(`Please provide a name`)
            .trim()
            .escape()
            .isString()
            .withMessage(`Please send the title as a string`)
            .isLength({max: 20})
            .withMessage(`Please limit title to 60 characters`),
        body("image")
            .exists()
            .withMessage(`Please add image to the player: req.body.image`)
            .notEmpty()
            .withMessage(`Please provide image`)
            .trim()
            .isString()
            .withMessage(`Please send the body as a base64 string`),
    ])

    playerDataChecks = (max: number) => this.validate([
        body("codes")
            .exists()
            .withMessage(`Please add codes to the request: req.body.name`)
            .isArray({max})
            .withMessage(`Please sent the codes as array of 10 strings`),
    ])

    validCodeStrings = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const codes = Array.from(
                new Set(
                    req.body.codes.filter(
                        (name: string) =>
                            name &&
                            typeof name === "string" &&
                            name.length >= 1 &&
                            name.length <= 20
                    )
                )
            ) as Array<string>
            if (!codes.length) throw ErrorCodes.GENERAL_ERROR
            req.codes = codes
            next()
        } catch (error) {
            return handleError(error, req, res)
        }
    }
}

export default new PlayerMiddleware()
