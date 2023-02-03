import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestMicroservice } from '@nestjs/common';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app: INestMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5051',
        package: 'auth',
        protoPath: join(__dirname, '../proto/auth.proto'),
        loader: {
          keepCase: true,
          enums: String,
          oneofs: true,
          arrays: true,
        },
      },
    });

  await app.listen();
}
bootstrap();
