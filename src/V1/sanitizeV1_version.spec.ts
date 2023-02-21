
import * as assert from "assert";
import {TKnackVersionV1} from "./Types/TKnackVersionV1";
import {sanitizeV1_version} from "./sanitizeV1_version";



describe("Sanitize version", () => {
    it("Returns a valid Knack Version", () => {
        const version: TKnackVersionV1 = {
            _id: "12",
            status: "live",
            scenes: [],
            objects: []
        }
        const ret = sanitizeV1_version(version);
        assert(ret !== undefined && ret.version !== undefined && ret.version._id === "12");
    });
    it("Find duplicates in scenes views and objects fields", () => {
        const version: TKnackVersionV1 = {
            _id: "12",
            status: "live",
            scenes: [{
                key: "scene_1",
                views: [{
                    key: "key_1"
                }, {
                    key: "key_1"
                }]
            }],
            objects: [{
                key: "object_1",
                name: "object 1",
                fields: [{
                    key: "object_1",
                    name: "object_1"
                }, {
                    key: "object_1",
                    name: "object_1"
                }]
            }]
        }
        const ret = sanitizeV1_version(version);
        assert(ret !== undefined &&
            ret.version.scenes.length === 1 &&
            ret.version.scenes[0].views.length === 1 &&
            ret.version.objects.length === 1 &&
            ret.version.objects[0].fields.length === 1);
    });
    it("Remove duplicates objects and scenes.", () => {
        const version: TKnackVersionV1 = {
            _id: "12",
            status: "live",
            scenes: [{
                key: "scene_1",
                views: [{
                    key: "key_1"
                }, {
                    key: "key_1"
                }]
            },{
                key: "scene_1",
                views: [{
                    key: "key_1"
                }, {
                    key: "key_1"
                }]
            }],
            objects: [{
                key: "object_1",
                name: "object 1",
                fields: [{
                    key: "object_1",
                    name: "object_1"
                }, {
                    key: "object_1",
                    name: "object_1"
                }]
            }, {
                key: "object_1",
                name: "object 1",
                fields: [{
                    key: "object_1",
                    name: "object_1"
                }, {
                    key: "object_1",
                    name: "object_1"
                }]
            }]
        }
        const ret = sanitizeV1_version(version);
        assert(ret !== undefined &&
            ret.version.scenes.length === 1 &&
            ret.version.scenes[0].views.length === 1 &&
            ret.version.objects.length === 1 &&
            ret.version.objects[0].fields.length === 1);
    });
});