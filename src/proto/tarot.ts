// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.4.2
//   protoc               v5.28.2
// source: src/proto/tarot.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "tarot_reader";

export interface CardContent {
  keywords: string[];
  advice: string;
  createdAt: string;
}

export interface Card {
  title: string;
  titleKr: string;
  createdAt: string;
  contents: CardContent | undefined;
}

export interface ReadTarotRequest {
}

export interface ReadTarotResponse {
  message: string;
  data: ReadTarotResponse_Data | undefined;
}

export interface ReadTarotResponse_Data {
  card: Card | undefined;
}

export const TAROT_READER_PACKAGE_NAME = "tarot_reader";

export interface TarotServiceClient {
  readTarot(request: ReadTarotRequest): Observable<ReadTarotResponse>;
}

export interface TarotServiceController {
  readTarot(request: ReadTarotRequest): Promise<ReadTarotResponse> | Observable<ReadTarotResponse> | ReadTarotResponse;
}

export function TarotServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["readTarot"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TarotService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TarotService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TAROT_SERVICE_NAME = "TarotService";