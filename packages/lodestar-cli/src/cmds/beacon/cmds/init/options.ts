import {Options} from "yargs";

import {canonicalOptions} from "../../../../util";
import {IBeaconArgs} from "../../options";
import {paramsOptions} from "./params";

export interface IBeaconInitArgs extends IBeaconArgs {
  templateConfigFile?: string;
}

const templateConfig: Options = {
  alias: ["templateConfigFile", "templateConfig"],
  description: "Template configuration used to initialize beacon node",
  type: "string",
  default: null,
};

export const beaconInitOptions = canonicalOptions({templateConfig, ...paramsOptions});

export const chainParamsOptions: Options = {
  alias: "chain.params",
  type: "string",
}