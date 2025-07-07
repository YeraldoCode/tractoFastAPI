import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validateUser( schema: ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
        res.status(400).json({
            message: 'Validation error',
            errors: result.error.errors,
        });
        return;
        }
        //agregamos los datos validados al objeto 
        req.body = result.data;
        next();
    };
    }