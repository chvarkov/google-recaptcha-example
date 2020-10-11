import { ErrorCode, ErrorHandler } from '@nestlab/google-recaptcha';
import { InternalServerErrorException } from '@nestjs/common';

export const recaptchaErrorHandler: ErrorHandler = (errorCodes: ErrorCode[]) => {
    switch (errorCodes.shift()) {
        case ErrorCode.InvalidInputResponse:
            return 'The response parameter is invalid or malformed.';

        case ErrorCode.MissingInputResponse:
            return 'The response parameter is missing.';

        case ErrorCode.TimeoutOrDuplicate:
            return 'The response is no longer valid: either is too old or has been used previously.';

        case ErrorCode.InvalidInputSecret:
        case ErrorCode.MissingInputSecret:
            throw new InternalServerErrorException('Invalid module configuration. Please check public-secret keys.');

        case ErrorCode.UnknownError:
        case ErrorCode.BadRequest:
        default:
            throw new InternalServerErrorException('Unexpected error. Please submit issue to @nestlab/google-recaptcha.')
    }
};
