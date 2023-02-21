
import * as assert from "assert";
import {TKnackObjectV1} from "./Types/TKnackObjectV1";
import {sanitizeV1_object} from "./sanitizeV1_object";

describe("Sanitize object", () => {
    it("Returns a valid Knack Object", () => {
        const object: TKnackObjectV1 = {
            key: "132456789",
            name: "No fields",
            fields: []
        }
        const ret = sanitizeV1_object(object);
        assert(ret !== undefined && ret.object !== undefined && ret.object.key === "132456789");
    });
    it("Returns the same number of fields if no duplicates are found.", () => {
        const object: TKnackObjectV1 = {
            key: "132456789",
            name: "2 Fields",
            fields: [{
                key: "key_1",
                name: "Key1"
            }, {
                key: "key_2",
                name: "Key2"
            }]
        };
        const ret = sanitizeV1_object(object);
        assert(ret !== undefined && ret.object.fields.length === 2);
    });
    it("Remove duplicates fields.", () => {
        const object: TKnackObjectV1 = {
            key: "132456789",
            name: "2 Fields",
            fields: [{
                _id: "1",
                key: "key_1",
                name: "Key1"
            }, {
                _id: "2",
                key: "key_1",
                name: "Key1"
            }]
        };
        const ret = sanitizeV1_object(object);
        assert(ret !== undefined && ret.object.fields.length === 1 && ret.notifications.length === 1);
    });
});