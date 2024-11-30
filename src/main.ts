import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcOptions, RpcException, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { Http2gRPCExceptionFilter } from './filters/Http2GRPCException.filter';

async function bootstrap() {
  const port = parseInt(process.env.PORT || '5000');
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${port}`,
      package: 'tarot_reader',
      protoPath: [
        join(__dirname, 'proto/card.proto'),
        join(__dirname, 'proto/tarot.proto'),
      ],
      loader: {
        arrays: true,
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new RpcException(errors),
    }),
  );
  app.useGlobalFilters(new Http2gRPCExceptionFilter());
  await app.listen();
}
bootstrap();
