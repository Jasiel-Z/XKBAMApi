const validationErrorHandler = (err, req, res, next) => {
    if (err && err.isJoi) {
        return res.status(400).json({
            message: 'Solicitud no válida',
            errors: err.details.map(detail => detail.message)
        });
    }
    next(err);
};

module.exports = validationErrorHandler;
