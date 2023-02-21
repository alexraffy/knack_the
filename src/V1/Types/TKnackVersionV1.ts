import {TKnackObjectV1} from "./TKnackObjectV1";
import {TKnackSceneV1} from "./TKnackSceneV1";


export interface TKnackVersionV1 {
    _id: string;
    status: string;
    objects: TKnackObjectV1[];
    scenes: TKnackSceneV1[];
}