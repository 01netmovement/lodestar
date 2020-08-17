import {List} from "@chainsafe/ssz";
import {Attestation, AttestationData, CommitteeIndex, Epoch, Slot, VoluntaryExit,
  SignedVoluntaryExit, SignedAggregateAndProof,} from "@chainsafe/lodestar-types";
import crypto from "crypto";
import {AggregateAndProof} from "@chainsafe/lodestar-types/src";
import {DeepPartial} from "./misc";
import deepmerge from "deepmerge";
import {isPlainObject} from "@chainsafe/lodestar-utils";

/**
 * Generates a fake attestation data for test purposes.
 * @returns {AttestationData}
 * @param sourceEpoch
 * @param targetEpoch
 * @param index
 * @param slot
 */

export function generateAttestationData(sourceEpoch: Epoch, targetEpoch: Epoch, index: CommitteeIndex = 1, slot: Slot = 1): AttestationData {
  return {
    slot: slot,
    index: index,
    beaconBlockRoot: crypto.randomBytes(32),
    source: {
      epoch: sourceEpoch,
      root: Buffer.alloc(32),
    },
    target: {
      epoch: targetEpoch,
      root: Buffer.alloc(32),
    },
  };
}

export function generateAttestation(override: DeepPartial<Attestation> = {}): Attestation {
  return deepmerge<Attestation, DeepPartial<Attestation>>({
    aggregationBits: Array.from({length: 64}, () => false) as List<boolean>,
    data: {
      slot: 0,
      index: 0,
      beaconBlockRoot: Buffer.alloc(32),
      source: {
        epoch: 0,
        root: Buffer.alloc(32),
      },
      target: {
        epoch: 0,
        root: Buffer.alloc(32),
      },
    },
    signature: Buffer.alloc(96),

  },override, {isMergeableObject: isPlainObject});
}

export function generateEmptyAttestation(): Attestation {
  return generateAttestation();
}

export function generateEmptySignedAggregateAndProof(): SignedAggregateAndProof {
  const message = generateEmptyAggregateAndProof();
  return {
    message,
    signature: Buffer.alloc(96),
  };
}

export function generateEmptyAggregateAndProof(): AggregateAndProof {
  const attestation = generateEmptyAttestation();
  return {
    aggregatorIndex: 0,
    selectionProof: Buffer.alloc(96),
    aggregate: attestation,
  };
}

export function generateEmptyVoluntaryExit(): VoluntaryExit {
  return {
    epoch: 0,
    validatorIndex: 0,
  };
}

export function generateEmptySignedVoluntaryExit(): SignedVoluntaryExit {
  return {
    message: generateEmptyVoluntaryExit(),
    signature: Buffer.alloc(96),
  };
}
