import {body, param} from "express-validator"
import CommonValidator from "../utils/common.validator"

class RoomMiddleware extends CommonValidator {
    constructor() {
        super()
        console.log("RoomMiddleware instance created")
    }

    paramChecks = this.validate([
        param("id").exists().withMessage(`Please add post id to the /room`),
    ])

    // bodyFieldsChecks = this.validate([
    //     body("title")
    //         .exists()
    //         .withMessage(`Please add title to the post: req.body.title`)
    //         .notEmpty()
    //         .withMessage(`Please provide title`)
    //         .trim()
    //         .escape()
    //         .isString()
    //         .withMessage(`Please send the title as a string`)
    //         .isLength({max: 60})
    //         .withMessage(`Please limit title to 60 characters`),
    //     body("summary")
    //         .optional({nullable: true})
    //         .trim()
    //         .escape()
    //         .isString()
    //         .withMessage(`Please send the summary as a string`)
    //         .isLength({max: 150})
    //         .withMessage("Please limit summary to 150 characters"),
    //     body("body")
    //         .exists()
    //         .withMessage(`Please add body to the post: req.body.body`)
    //         .notEmpty()
    //         .withMessage(`Please provide body`)
    //         .trim()
    //         .escape()
    //         .isString()
    //         .withMessage(`Please send the body as a string`),
    //     body("community")
    //         .exists()
    //         .withMessage(`Please add community to the post: req.body.community`)
    //         .notEmpty()
    //         .withMessage(`Please provide community slug`)
    //         .trim()
    //         .escape()
    //         .isString()
    //         .withMessage(`Please send the title as a string`)
    //         .isLength({max: 60})
    //         .withMessage(`Please limit title to 60 characters`),
    // ])
}

export default new RoomMiddleware()
