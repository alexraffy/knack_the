import {TKnackSchemaV1} from "./Types/TKnackSchemaV1";
import {sanitizeV1_version} from "./sanitizeV1_version";


// Sanitize a TKnackSchemaV1
// Returns a struct with two properties: schema containing the sanitized schema
//   and notifications, an array of string containing a message when a duplicate object is deleted
// calls sanitizeV1_version for each version found in the schema.
export function sanitizeV1(schema: TKnackSchemaV1): { schema: TKnackSchemaV1, notifications: string[] } {
    let newSchema = Object.assign(schema, schema);
    let notifications: string[] = [];
    for (let i = 0; i < newSchema.versions.length; i++) {
        let sanitizedVersion = sanitizeV1_version(newSchema.versions[i]);
        newSchema.versions[i] = sanitizedVersion.version;
        notifications.push(...sanitizedVersion.notifications);
    }

    return { schema: newSchema, notifications };
}