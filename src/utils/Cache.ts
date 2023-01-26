/**
 * Cache Core Functionality
 */

import { DemographicData } from "../Interfaces/demographic.interface";
import { UserInputData } from "../Interfaces/userData.interface";

const getCachedInput = () => {
    const rawCachedInput = localStorage.getItem("userInput");
    if (rawCachedInput === null)
        return null;

    const cachedUserInput = JSON.parse(rawCachedInput) as UserInputData;

    return cachedUserInput;
};

const getCachedDemographics = () => {
    const rawCachedDemographics = localStorage.getItem("demographics");
    if (rawCachedDemographics === null)
        return null;

    return JSON.parse(rawCachedDemographics) as DemographicData;
};

export {
    getCachedInput,
    getCachedDemographics
} 
