import {TKnackSceneV1} from "./Types/TKnackSceneV1";

// Sanitize a Scene
// find duplicates keys in property views
// Returns the sanitized scene and notification for each view deleted.
export function sanitizeV1_scene(scene: TKnackSceneV1): { scene: TKnackSceneV1, notifications: string[]} {
    let newScene: TKnackSceneV1 = Object.assign({}, scene);
    let notifications: string[] = [];

    let views_keys = {};
    for (let i = newScene.views.length - 1; i >= 0; i--) {
        const v = newScene.views[i];
        if (views_keys[v.key] !== undefined) {
            notifications.push(`View ${v._id} was deleted in scene ${newScene._id}: duplicate key ${v.key}`);
            newScene.views.splice(i, 1);
            continue;
        }
        views_keys[v.key] = 1;
    }
    return { scene: newScene, notifications };
}