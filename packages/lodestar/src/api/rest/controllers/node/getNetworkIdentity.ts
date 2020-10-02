import {ApiController} from "../types";
import {objectToExpectedCase} from "@chainsafe/lodestar-utils";

export const getNetworkIdentity: ApiController = {
  url: "/identity",
  opts: {
    schema: {},
  },
  handler: async function (req, resp) {
    const identity = await this.api.node.getNodeIdentity();
    const metadataJson = this.config.types.Metadata.toJson(identity.metadata, {case: "snake"});
    resp.status(200).send({
      data: {
        ...objectToExpectedCase(identity, "snake"),
        metadata: metadataJson,
      },
    });
  },
};
