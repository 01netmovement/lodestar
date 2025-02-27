import {PeerId} from "@libp2p/interface-peer-id";
import {IBeaconConfig, IForkConfig, IForkDigestContext} from "@lodestar/config";
import {ForkName} from "@lodestar/params";
import {Slot} from "@lodestar/types";
import {LodestarError} from "@lodestar/utils";

export enum EncodedPayloadType {
  ssz,
  bytes,
}

export type EncodedPayload<T> =
  | {
      type: EncodedPayloadType.ssz;
      data: T;
    }
  | {
      type: EncodedPayloadType.bytes;
      bytes: Uint8Array;
      contextBytes: ContextBytes;
    };

export type ReqRespHandler<Req, Resp> = (req: Req, peerId: PeerId) => AsyncIterable<EncodedPayload<Resp>>;

export interface Protocol {
  readonly protocolPrefix: string;
  /** Protocol name identifier `beacon_blocks_by_range` or `status` */
  readonly method: string;
  /** Version counter: `1`, `2` etc */
  readonly version: number;
  readonly encoding: Encoding;
}

// `protocolPrefix` is added runtime so not part of definition
export interface ProtocolDefinition<Req = unknown, Resp = unknown> extends Omit<Protocol, "protocolPrefix"> {
  handler: ReqRespHandler<Req, Resp>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestType: (fork: ForkName) => TypeSerializer<Req> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseType: (fork: ForkName) => TypeSerializer<Resp>;
  renderRequestBody?: (request: Req) => string;
  contextBytes: ContextBytesFactory<Resp>;
}

export type ProtocolDefinitionGenerator<Req, Res> = (
  // "inboundRateLimiter" is available only on handler context not on generator
  modules: {config: IBeaconConfig},
  handler: ReqRespHandler<Req, Res>
) => ProtocolDefinition<Req, Res>;

export type HandlerTypeFromMessage<T> = T extends ProtocolDefinitionGenerator<infer Req, infer Res>
  ? ReqRespHandler<Req, Res>
  : never;

export const protocolPrefix = "/eth2/beacon_chain/req";

/**
 * Available request/response encoding strategies:
 * https://github.com/ethereum/consensus-specs/blob/v1.1.10/specs/phase0/p2p-interface.md#encoding-strategies
 */
export enum Encoding {
  SSZ_SNAPPY = "ssz_snappy",
}

export const CONTEXT_BYTES_FORK_DIGEST_LENGTH = 4;

export type ContextBytesFactory<Response> =
  | {type: ContextBytesType.Empty}
  | {
      type: ContextBytesType.ForkDigest;
      forkDigestContext: IForkDigestContext & Pick<IForkConfig, "getForkName">;
      forkFromResponse: (response: Response) => ForkName;
    };

export type ContextBytes = {type: ContextBytesType.Empty} | {type: ContextBytesType.ForkDigest; forkSlot: Slot};

export enum ContextBytesType {
  /** 0 bytes chunk, can be ignored */
  Empty,
  /** A fixed-width 4 byte <context-bytes>, set to the ForkDigest matching the chunk: compute_fork_digest(fork_version, genesis_validators_root) */
  ForkDigest,
}

export enum LightClientServerErrorCode {
  RESOURCE_UNAVAILABLE = "RESOURCE_UNAVAILABLE",
}

export type LightClientServerErrorType = {code: LightClientServerErrorCode.RESOURCE_UNAVAILABLE};

export class LightClientServerError extends LodestarError<LightClientServerErrorType> {}

/**
 * Lightweight interface of ssz Type<T>
 */
export interface TypeSerializer<T> {
  serialize(data: T): Uint8Array;
  deserialize(bytes: Uint8Array): T;
  maxSize: number;
  minSize: number;
}
