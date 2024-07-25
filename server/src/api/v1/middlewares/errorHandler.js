
import AppError from '../utils/AppError.js';

function errorHandler(err, req, res, next) {
    // Default to a 500 Internal Server Error if no status code is set
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
 
    // Handle MongoDB CastError
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new AppError(message, 400);
    }
 
    // Handle Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate field value entered: ${Object.keys(err.keyValue).join(', ')}`;
        err = new AppError(message, 400);
    }
 
    // Handle JWT invalid error
    if (err.name === 'JsonWebTokenError') {
        const message = 'JSON Web Token is invalid. Try again.';
        err = new AppError(message, 400);
    }
 
    // Handle JWT expired error
    if (err.name === 'TokenExpiredError') {
        const message = 'JSON Web Token has expired. Try again.';
        err = new AppError(message, 400);
    }
 
    // Send error response
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

export default errorHandler;
