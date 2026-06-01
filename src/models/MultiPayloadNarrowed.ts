/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MultiPayloadErc191Narrowed } from './MultiPayloadErc191Narrowed';
import type { MultiPayloadNep413Narrowed } from './MultiPayloadNep413Narrowed';
import type { MultiPayloadRawEd25519Narrowed } from './MultiPayloadRawEd25519Narrowed';
import type { MultiPayloadSep53Narrowed } from './MultiPayloadSep53Narrowed';
import type { MultiPayloadTip191Narrowed } from './MultiPayloadTip191Narrowed';
import type { MultiPayloadTonConnectNarrowed } from './MultiPayloadTonConnectNarrowed';
import type { MultiPayloadWebauthnNarrowed } from './MultiPayloadWebauthnNarrowed';
/**
 * Narrowed MultiPayload union with only 'standard' and 'payload' properties exposed
 */
export type MultiPayloadNarrowed = (MultiPayloadNep413Narrowed | MultiPayloadErc191Narrowed | MultiPayloadTip191Narrowed | MultiPayloadRawEd25519Narrowed | MultiPayloadWebauthnNarrowed | MultiPayloadTonConnectNarrowed | MultiPayloadSep53Narrowed);

