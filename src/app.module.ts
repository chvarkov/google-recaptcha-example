import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'
import { SharedModule } from './shared';
import { APP_MODULES } from './modules';

@Module({
    imports: [
        SharedModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
        }),
        ...APP_MODULES,
    ],
})
export class AppModule {}
