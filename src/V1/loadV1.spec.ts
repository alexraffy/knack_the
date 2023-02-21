import {loadV1} from "./loadV1";
import * as assert from "assert";
import {TKnackSchemaV1} from "./Types/TKnackSchemaV1";


describe("Load Knack schema from string", ()=> {
    it("Errors on invalid JSON", () => {
        let ret = loadV1("<>");
        assert(ret.success === false && ret.errorMessage !== "");
    });
    it("Errors if JSON is not a Knack Schema", ()=> {
        let ret = loadV1("{}");
        assert(ret.success === false && ret.errorMessage !== "");
    });
    it("Load a Knack Schema correctly", () => {
        let schema: TKnackSchemaV1 = {
            versions: []
        }
        let ret = loadV1(JSON.stringify(schema));
        assert(ret.success === true && ret.schema !== undefined && ret.schema.versions !== undefined);
    })
})