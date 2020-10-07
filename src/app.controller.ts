import { Controller, Post } from '@nestjs/common';
import { Recaptcha } from '@nestlab/google-recaptcha';

@Controller()
export class AppController {
    @Recaptcha()
    @Post('submit')
    submit(): object {
        return {
            data: 'Successful submitted',
        };
    }
}
