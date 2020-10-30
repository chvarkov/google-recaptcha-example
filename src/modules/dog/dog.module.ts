import { Module } from '@nestjs/common';
import { DogController } from './controllers/dog.controller';

@Module({
    controllers: [
        DogController,
    ],
})
export class DogModule {}
