import { Module } from '@nestjs/common';
import { CatController } from './controllers/cat.controller';

@Module({
    controllers: [
        CatController,
    ],
})
export class CatModule {}
