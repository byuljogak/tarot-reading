import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcOptions, RpcException, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { Http2gRPCExceptionFilter } from './filters/Http2GRPCException.filter';
import { BYULJOGAK_TAROT_READER_PACKAGE_NAME } from './proto/tarot_service';

async function bootstrap() {
  const port = parseInt(process.env.PORT || '5000');

  //const serverCert = fs.readFileSync(
  //  join(__dirname, '../certs/server-cert.pem'),
  //);
  //const serverKey = fs.readFileSync(join(__dirname, '../certs/server-key.pem'));

  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${port}`,
      package: BYULJOGAK_TAROT_READER_PACKAGE_NAME,
      protoPath: [
        join(__dirname, '../proto/card.proto'),
        join(__dirname, '../proto/card_service.proto'),
        join(__dirname, '../proto/tarot_service.proto'),
      ],
      //credentials: ServerCredentials.createSsl(null, [
      //  {
      //    cert_chain: serverCert,
      //    private_key: serverKey,
      //  },
      //]),
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
