import {loadV1} from "./V1/loadV1";
import {sanitizeV1} from "./V1/sanitizeV1";
import {TKnackProcessSchemaResult} from "./TKnackProcessSchemaResult";


// Attempt to parse the schema string, detect the version and sanitize
export function processSchema(stream: string): TKnackProcessSchemaResult {
    let result: TKnackProcessSchemaResult = {
        success: false,
        errorMessage: "",
        notifications: []
    }
    // TODO: try to detect schema version...

    // V1
    result = loadV1(stream);
    if (result.success === true) {
        let sanitizedSchema = sanitizeV1(result.schema);
        result.schema = sanitizedSchema.schema;
        result.notifications.push(...sanitizedSchema.notifications);
    }


    // TODO: optional migrate to future schema version


    return result;
}