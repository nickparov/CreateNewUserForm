import { State } from "./interfaces";

export interface DemographicApiResponse {
    occupations: string[];
    states: State[];
}

export type DemographicData = {
    occupations: string[];
    states: State[];
};