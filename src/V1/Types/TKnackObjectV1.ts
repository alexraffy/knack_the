import {TKnackObjectFieldV1} from "./TKnackObjectFieldV1";


export interface TKnackObjectV1 {
    [key:string]: any;
    name: string;
    key: string;
    fields: TKnackObjectFieldV1[];
}