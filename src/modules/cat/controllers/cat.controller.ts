import { Controller, Post } from '@nestjs/common';
import { Recaptcha } from '@nestlab/google-recaptcha';

@Controller('cats')
export class CatController {
    @Recaptcha()
    @Post('submit')
    submit(): object {
        return {
            message: 'Cat successful submitted',
        };
    }
}
