export const ValidationMiddleware = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log("Validation error:", error.details);

            return res.status(400).send({
                message: "Validation failed",
                details: error.message
            });
        }

        req.body = value;
        next();
    };
};
