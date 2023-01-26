export class InputData {
    error: boolean;
    value: string | null;
    helperText: string | null;

    constructor(
        value: string | null = "",
        helperText: string | null = null,
        error: boolean = false
    ) {
        this.error = error;
        this.value = value;
        this.helperText = helperText;
    }
}

// export type InputData = { error: boolean, value: string | null, helperText: string | null };

export type UserInputData = {
    "firstName": InputData;
    "lastName": InputData;
    "email": InputData;
    "occupation": InputData;
    "state": InputData;
    "password": InputData;
};


export type UserInputPayload = {
    name: string;
    email: string;
    occupation: string;
    state: string;
    password: string;
}