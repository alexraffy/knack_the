import {TKnackObjectV1} from "./Types/TKnackObjectV1";

// Sanitize a Object
// find duplicates keys in property fields
// Returns the sanitized object and notification for each field deleted.
export function sanitizeV1_object(obj: TKnackObjectV1): { object: TKnackObjectV1, notifications: string[] } {
    let newObject = Object.assign({}, obj);
    let notifications : string[] = [];
    let fields_keys = {};
    for (let i = newObject.fields.length - 1; i >= 0; i--) {
        const f = newObject.fields[i];
        if (fields_keys[f.key] !== undefined) {
            notifications.push(`Field ${f._id} was deleted in object ${newObject._id}: duplicate key ${f.key}`);
            newObject.fields.splice(i, 1);
            continue;
        }
        fields_keys[f.key] = 1;
    }
    return {object: newObject, notifications};
}