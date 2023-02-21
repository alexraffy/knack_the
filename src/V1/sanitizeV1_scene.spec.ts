
import * as assert from "assert";
import {TKnackSceneV1} from "./Types/TKnackSceneV1";
import {sanitizeV1_scene} from "./sanitizeV1_scene";


describe("Sanitize scene", () => {
    it("Returns a valid Knack Scene", () => {
        const scene: TKnackSceneV1 = {
            key: "123456789",
            views: []
        }
        const ret = sanitizeV1_scene(scene);
        assert(ret !== undefined && ret.scene !== undefined && ret.scene.key === "123456789");
    });
    it("Returns the same number of views if no duplicates are found.", () => {
        const scene: TKnackSceneV1 = {
            key: "123456789",
            views: [{
                key: "key_1"
            },{
                key: "key_2"
            }]
        };
        const ret = sanitizeV1_scene(scene);
        assert(ret !== undefined && ret.scene.views.length === 2);
    });
    it("Remove duplicates views.", () => {
        const scene: TKnackSceneV1 = {
            key: "123456789",
            views: [{
                key: "key_1"
            },{
                key: "key_1"
            }]
        };
        const ret = sanitizeV1_scene(scene);
        assert(ret !== undefined && ret.scene.views.length === 1 && ret.notifications.length === 1);
    });
});