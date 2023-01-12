const fileChecker = (req, res, next) => {
    try {
        next()
    } catch (error) {
        handleError(error, req, res)
    }
}