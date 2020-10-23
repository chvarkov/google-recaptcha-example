import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { GoogleRecaptchaException } from '@nestlab/google-recaptcha';

@Catch(GoogleRecaptchaException)
export class GoogleRecaptchaFilter implements ExceptionFilter {
    catch(exception: GoogleRecaptchaException, host: ArgumentsHost): any {
        const res: Response = host.switchToHttp().getResponse();

        res.status(exception.getStatus()).send({
            type: 'GoogleRecaptchaError',
            message: exception.message,
        });
    }
}
