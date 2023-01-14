export interface State {
    name: string;
    abbreviation: string;
}

export interface DemographicApiResponse {
    occupations: string[];
    states: State[];
}

export type DemographicData = {
    occupations: string[];
    states: State[];
};