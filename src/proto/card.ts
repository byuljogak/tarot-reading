// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.4.2
//   protoc               v5.28.2
// source: card.proto

/* eslint-disable */
import { Timestamp } from "./google/protobuf/timestamp.js";

export const protobufPackage = "byuljogak.tarot.reader";

export interface CardContent {
  id?: string | undefined;
  keywords: string[];
  advice: string;
  createdAt: Timestamp | undefined;
}

export interface Card {
  id?: string | undefined;
  title: string;
  titleKr: string;
  createdAt: Timestamp | undefined;
}

export const BYULJOGAK_TAROT_READER_PACKAGE_NAME = "byuljogak.tarot.reader";
