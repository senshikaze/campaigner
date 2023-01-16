import { Entry } from "./entry";

export interface Campaign {
    id: string;
    name: string;
    entries: Entry[];
}
