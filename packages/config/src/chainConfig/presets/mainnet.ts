/* eslint-disable @typescript-eslint/naming-convention */
import {fromHexString as b} from "@chainsafe/ssz";
import {PresetName} from "@lodestar/params";
import {IChainConfig} from "../types.js";

export const chainConfig: IChainConfig = {
  PRESET_BASE: PresetName.mainnet,
  CONFIG_NAME: "mainnet",

  // Transition
  // Estimated: Sept 15, 2022
  TERMINAL_TOTAL_DIFFICULTY: BigInt("58750000000000000000000"),
  TERMINAL_BLOCK_HASH: b("0x0000000000000000000000000000000000000000000000000000000000000000"),
  TERMINAL_BLOCK_HASH_ACTIVATION_EPOCH: Infinity,

  // Genesis
  // ---------------------------------------------------------------
  // `2**14` (= 16,384)
  MIN_GENESIS_ACTIVE_VALIDATOR_COUNT: 16384,
  // Dec 1, 2020, 12pm UTC
  MIN_GENESIS_TIME: 1606824000,
  // Mainnet initial fork version, recommend altering for testnets
  GENESIS_FORK_VERSION: b("0x00000000"),
  // 604800 seconds (7 days)
  GENESIS_DELAY: 604800,

  // Forking
  // ---------------------------------------------------------------
  // Some forks are disabled for now:
  //  - These may be re-assigned to another fork-version later
  //  - Temporarily set to max uint64 value: 2**64 - 1

  // Altair
  ALTAIR_FORK_VERSION: b("0x01000000"),
  ALTAIR_FORK_EPOCH: 74240, // Oct 27, 2021, 10:56:23am UTC
  // Bellatrix
  BELLATRIX_FORK_VERSION: b("0x02000000"),
  BELLATRIX_FORK_EPOCH: 144896, // Sept 6, 2022, 11:34:47am UTC

  // Capella
  CAPELLA_FORK_VERSION: b("0x03000000"),
  CAPELLA_FORK_EPOCH: Infinity,

  // Time parameters
  // ---------------------------------------------------------------
  // 12 seconds
  SECONDS_PER_SLOT: 12,
  // 14 (estimate from Eth1 mainnet)
  SECONDS_PER_ETH1_BLOCK: 14,
  // 2**8 (= 256) epochs ~27 hours
  MIN_VALIDATOR_WITHDRAWABILITY_DELAY: 256,
  // 2**8 (= 256) epochs ~27 hours
  SHARD_COMMITTEE_PERIOD: 256,
  // 2**11 (= 2,048) Eth1 blocks ~8 hours
  ETH1_FOLLOW_DISTANCE: 2048,

  // Validator cycle
  // ---------------------------------------------------------------
  // 2**2 (= 4)
  INACTIVITY_SCORE_BIAS: 4,
  // 2**4 (= 16)
  INACTIVITY_SCORE_RECOVERY_RATE: 16,
  // 2**4 * 10**9 (= 16,000,000,000) Gwei
  EJECTION_BALANCE: 16000000000,
  // 2**2 (= 4)
  MIN_PER_EPOCH_CHURN_LIMIT: 4,
  // 2**16 (= 65,536)
  CHURN_LIMIT_QUOTIENT: 65536,
  PROPOSER_SCORE_BOOST: 40,

  // Deposit contract
  // ---------------------------------------------------------------
  // Ethereum PoW Mainnet
  DEPOSIT_CHAIN_ID: 1,
  DEPOSIT_NETWORK_ID: 1,
  DEPOSIT_CONTRACT_ADDRESS: b("0x00000000219ab540356cBB839Cbe05303d7705Fa"),
};
