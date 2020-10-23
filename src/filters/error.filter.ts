import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): any {
        const res: Response = host.switchToHttp().getResponse();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        res.status(status).send({
            type: 'Error',
            message: exception.message,
        });
    }
}
