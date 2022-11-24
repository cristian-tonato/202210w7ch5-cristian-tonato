import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interface/error.js';

export const errorManager = (
    error: CustomError,
    _req: Request,
    resp: Response,
    next: NextFunction
) => {
    console.log(
        error.message,
        error.name,
        error.statusCode,
        error.statusMessage
    );
    let status = error.statusCode || 500;
    if (error.name === 'ValidationError') {
        status = 406;
    }
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.status(status).json(result).end();
};
