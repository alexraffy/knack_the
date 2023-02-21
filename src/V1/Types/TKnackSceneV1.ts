import {TKnackViewV1} from "./TKnackViewV1";


export interface TKnackSceneV1 {
    [key:string]: any;
    key: string;
    views: TKnackViewV1[];
}