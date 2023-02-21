
import * as assert from "assert";
import {TKnackSchemaV1} from "./Types/TKnackSchemaV1";
import {sanitizeV1} from "./sanitizeV1";


describe("SanitizeV1", () => {
    it("Returns a valid Knack Schema", () => {
        const schema: TKnackSchemaV1 = {
            versions: [
                {
                    _id: "1234",
                    objects: [],
                    scenes: [],
                    status: ""
                }
            ]
        }
        const ret = sanitizeV1(schema);
        assert(ret !== undefined &&
            ret.schema !== undefined &&
            ret.schema.versions.length === 1 &&
            ret.schema.versions[0]._id === "1234");
    });
})