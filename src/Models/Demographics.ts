import axios from "axios";
import { DemographicApiResponse } from "../Interfaces/demographic.interface";



export const fetchDemographics = async (cb: (data: DemographicApiResponse) => void, errCb: (message: string) => void) => {
    axios
        .get("https://frontend-take-home.fetchrewards.com/form")
        .then((res) => {



            cb(res.data as DemographicApiResponse);
        })
        .catch((err) => {
            const { message } = err as Error;

            errCb(message);
        });
}