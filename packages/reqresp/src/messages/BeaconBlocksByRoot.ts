import {allForks, phase0, ssz} from "@lodestar/types";
import {toHex} from "@lodestar/utils";
import {ContextBytesType, Encoding, ProtocolDefinitionGenerator} from "../types.js";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BeaconBlocksByRoot: ProtocolDefinitionGenerator<
  phase0.BeaconBlocksByRootRequest,
  allForks.SignedBeaconBlock
> = (_modules, handler) => {
  return {
    method: "beacon_blocks_by_root",
    version: 1,
    encoding: Encoding.SSZ_SNAPPY,
    handler,
    requestType: () => ssz.phase0.BeaconBlocksByRootRequest,
    responseType: (forkName) => ssz[forkName].SignedBeaconBlock,
    renderRequestBody: (req) => req.map((root) => toHex(root)).join(","),
    contextBytes: {type: ContextBytesType.Empty},
  };
};
