import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { GoogleRecaptchaException } from '@nestlab/google-recaptcha/exceptions/google-recaptcha.exception';
import { ErrorCode } from '@nestlab/google-recaptcha';

@Catch(GoogleRecaptchaException)
export class GoogleRecaptchaFilter implements ExceptionFilter {
    catch(exception: GoogleRecaptchaException, host: ArgumentsHost): any {
        const res: Response = host.switchToHttp().getResponse();

        const firstErrorCode = exception.errorCodes.shift();

        const transformedError = this.transformError(firstErrorCode);

        res.status(transformedError.status).send({
            type: 'GoogleRecaptchaError',
            message: transformedError.message,
        });
    }

    transformError(errorCode: ErrorCode): {status: number, message: string} {
        switch (errorCode) {
            case ErrorCode.InvalidInputResponse:
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'The response parameter is invalid or malformed.',
                };

            case ErrorCode.MissingInputResponse:
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'The response parameter is missing.',
                };

            case ErrorCode.TimeoutOrDuplicate:
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'The response is no longer valid: either is too old or has been used previously.',
                };

            case ErrorCode.InvalidInputSecret:
            case ErrorCode.MissingInputSecret:
                return {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Invalid module configuration. Please check public-secret keys.',
                };

            case ErrorCode.UnknownError:
            case ErrorCode.BadRequest:
            default:
                return {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Unexpected error. Please submit issue to @nestlab/google-recaptcha.',
                };
        }
    }
}
