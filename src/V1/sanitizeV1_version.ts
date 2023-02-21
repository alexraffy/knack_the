import {TKnackVersionV1} from "./Types/TKnackVersionV1";
import {sanitizeV1_object} from "./sanitizeV1_object";
import {sanitizeV1_scene} from "./sanitizeV1_scene";

// Sanitize a Version
// find duplicates objects, scenes, object fields and scene views.
// Returns the sanitized version and notification for each element deleted.
export function sanitizeV1_version (version: TKnackVersionV1): { version: TKnackVersionV1, notifications: string[]} {
    let ret = Object.assign({}, version);
    let notifications: string[] = [];

    let objects_keys = {};
    let scenes_keys = {};

    for (let i = ret.objects.length - 1; i >= 0; i--) {
        const o = ret.objects[i];
        if (objects_keys[o.key] !== undefined) {
            notifications.push(`Object ${o._id} was deleted: duplicate key ${o.key}`);
            ret.objects.splice(i, 1);
            continue;
        }
        objects_keys[o.key] = 1;
        let sanitizedObject = sanitizeV1_object(o);
        ret.objects[i] = sanitizedObject.object;
        notifications.push(...sanitizedObject.notifications);
    }
    for (let i = ret.scenes.length - 1; i>= 0; i--) {
        const s = ret.scenes[i];
        if (scenes_keys[s.key] !== undefined) {
            notifications.push(`Scene ${s._id} was deleted: duplicate key ${s.key}`);
            ret.scenes.splice(i, 1);
            continue;
        }
        scenes_keys[s.key] = 1;
        let sanitizedScene = sanitizeV1_scene(s);
        ret.scenes[i] = sanitizedScene.scene;
        notifications.push(...sanitizedScene.notifications);
    }
    return {version: ret, notifications: notifications};
}