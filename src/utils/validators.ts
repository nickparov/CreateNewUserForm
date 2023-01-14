export const validateEmail = (email: string | null) => {
    if (email === null) return false;

    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
};


export const validateValFromPool = (val: string | null, pool: string[]) => {
    if (val === null) return false;
    if (!pool.includes(val)) return false;

    return true;
}


export const validateName = (val: string | null) => {

    return (val !== null && val.length > 0 && /^[a-zA-Z ]+$/.test(val));
}
