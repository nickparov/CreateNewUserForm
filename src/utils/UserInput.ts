import { InputData, UserInputData } from "../Interfaces/userData.interface";

type initializeDataType = { [key in keyof UserInputData]: string | null };
type initKeysType = (keyof UserInputData)[];

export function initUserInputData(data: initializeDataType = {
    state: null,
    occupation: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
}): UserInputData {
    const keys = Object.keys(data) as initKeysType;
    const newData = {} as UserInputData;

    for (const k of keys) {
        newData[k] = new InputData(data[k]);
    }

    return newData;
}