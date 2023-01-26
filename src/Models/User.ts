import axios from "axios";
import { UserInputPayload } from "../Interfaces/userData.interface";
import { UserData } from "../Store/app";

export const sendUser = (
    payload: UserInputPayload,
    cb: (data: UserData) => void,
    errCb: (message: string) => void
) => {
    axios
        .post("https://frontend-take-home.fetchrewards.com/form", payload)
        .then((res) => {
            const { data } = res;

            cb(data);
        })
        .catch((err) => {
            const { message } = err as Error;

            errCb(message);
        });
};
