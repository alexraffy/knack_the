import {kKnackSchemaVersion} from "./kKnackSchemaVersion";
import {TKnackSchemaV1} from "./V1/Types/TKnackSchemaV1";


export interface TKnackProcessSchemaResult {
    success: boolean;
    errorMessage: string;
    notifications: string[];
    schema?: TKnackSchemaV1
}
