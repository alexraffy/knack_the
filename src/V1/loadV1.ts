import {TKnackSchemaV1} from "./Types/TKnackSchemaV1";
import {instanceOfTKnackSchemaV1} from "./Guards/instanceOfTKnackSchemaV1";
import {TKnackProcessSchemaResult} from "../TKnackProcessSchemaResult";

// Attempt to parse a schema string.
// Returns a TKnackProcessSchemaResult struct
// success is set to false if parsing fails or if we cannot detect if it is a valid Knack Schema.
// if an errors occurs errorMessage contains the error message.
// schema contains a TKnackSchemaV1 struct if it is parsed correctly.

export function loadV1(sSchema: string): TKnackProcessSchemaResult {
    let result: TKnackProcessSchemaResult = {
        success: true,
        errorMessage: "",
        notifications: [],
    }

    try {
        result.schema = JSON.parse(sSchema);
        if (!instanceOfTKnackSchemaV1(result.schema)) {
            result.errorMessage = "INVALID SCHEMA. EXPECTED A KNACK SCHEMA V1.";
            result.success = false;
        }
    } catch (e) {
        result.errorMessage = "ERROR PARSING SCHEMA V1. ERROR RETURNED: " + e.message
        result.success = false;
    }
    return result;
}