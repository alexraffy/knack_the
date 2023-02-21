import {TKnackSchemaV1} from "../Types/TKnackSchemaV1";


export function instanceOfTKnackSchemaV1(object: any): object is TKnackSchemaV1 {
    return object !== undefined && object.versions !== undefined;
}