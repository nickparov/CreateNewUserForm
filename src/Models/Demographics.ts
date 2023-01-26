import axios from "axios";
import { DemographicApiResponse } from "../Interfaces/demographic.interface";



export const fetchDemographics = async (cb: (data: DemographicApiResponse) => void, errCb: (message: string) => void) => {
    try {
        const res = await axios.get("https://frontend-take-home.fetchrewards.com/form");
        const responseData = res.data as DemographicApiResponse;

        cb(responseData);
    } catch (err) {
        const { message } = err as Error;
        errCb(message);
    }
}