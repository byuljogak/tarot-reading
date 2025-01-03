// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.4.2
//   protoc               v5.28.2
// source: card_service.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Card, CardContent } from "./card.js";

export const protobufPackage = "byuljogak.tarot.reader";

export interface CreateCardRequest {
  title: string;
  titleKr: string;
}

export interface CreateCardResponse {
  card: Card | undefined;
}

export interface CreateCardContentRequest {
  cardId: string;
  keywords: string[];
  advice: string;
}

export interface CreateCardContentResponse {
  cardContent: CardContent | undefined;
}

export interface ReadCardRequest {
  title: string;
}

export interface ReadCardResponse {
  card: Card | undefined;
  cardContents: CardContent[];
}

export interface UpdateCardRequest {
  id: string;
  title?: string | undefined;
  titleKr?: string | undefined;
}

export interface UpdateCardResponse {
  card: Card | undefined;
}

export interface UpdateCardContentRequest {
  id: string;
  keywords: string[];
  advice?: string | undefined;
}

export interface UpdateCardContentResponse {
  cardContent: CardContent | undefined;
}

export interface DeleteCardRequest {
  id: string;
}

export interface DeleteCardResponse {
}

export interface DeleteCardContentRequest {
  id: string;
}

export interface DeleteCardContentResponse {
}

export const BYULJOGAK_TAROT_READER_PACKAGE_NAME = "byuljogak.tarot.reader";

export interface CardServiceClient {
  createCard(request: CreateCardRequest): Observable<CreateCardResponse>;

  createCardContent(request: CreateCardContentRequest): Observable<CreateCardContentResponse>;

  readCard(request: ReadCardRequest): Observable<ReadCardResponse>;

  updateCard(request: UpdateCardRequest): Observable<UpdateCardResponse>;

  updateCardContent(request: UpdateCardContentRequest): Observable<UpdateCardContentResponse>;

  deleteCard(request: DeleteCardRequest): Observable<DeleteCardResponse>;

  deleteCardContent(request: DeleteCardContentRequest): Observable<DeleteCardContentResponse>;
}

export interface CardServiceController {
  createCard(
    request: CreateCardRequest,
  ): Promise<CreateCardResponse> | Observable<CreateCardResponse> | CreateCardResponse;

  createCardContent(
    request: CreateCardContentRequest,
  ): Promise<CreateCardContentResponse> | Observable<CreateCardContentResponse> | CreateCardContentResponse;

  readCard(request: ReadCardRequest): Promise<ReadCardResponse> | Observable<ReadCardResponse> | ReadCardResponse;

  updateCard(
    request: UpdateCardRequest,
  ): Promise<UpdateCardResponse> | Observable<UpdateCardResponse> | UpdateCardResponse;

  updateCardContent(
    request: UpdateCardContentRequest,
  ): Promise<UpdateCardContentResponse> | Observable<UpdateCardContentResponse> | UpdateCardContentResponse;

  deleteCard(
    request: DeleteCardRequest,
  ): Promise<DeleteCardResponse> | Observable<DeleteCardResponse> | DeleteCardResponse;

  deleteCardContent(
    request: DeleteCardContentRequest,
  ): Promise<DeleteCardContentResponse> | Observable<DeleteCardContentResponse> | DeleteCardContentResponse;
}

export function CardServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createCard",
      "createCardContent",
      "readCard",
      "updateCard",
      "updateCardContent",
      "deleteCard",
      "deleteCardContent",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CardService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CardService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CARD_SERVICE_NAME = "CardService";
