import { Controller, Post } from '@nestjs/common';
import { Recaptcha } from '@nestlab/google-recaptcha';

@Controller('dogs')
export class DogController {
    @Recaptcha()
    @Post('submit')
    submit(): object {
        return {
            message: 'Dog successful submitted',
        };
    }
}
