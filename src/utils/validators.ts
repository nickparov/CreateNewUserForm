
/**
 * Validates an email address
 * @param {string | null} email The email address to validate
 * @returns {boolean} Whether the email address is valid
 */
export const validateEmail = (email: string | null) => {
    if (email === null) return false;

    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
};


/**
 * Validates a value against a pool of values
 * @param {T extends string | number} val The value to validate
 * @param {T[]} pool The pool of values to validate against
 * @returns {boolean} Whether the value is valid
 */
export const validateValFromPool = <T extends string | number>(val: T | null, pool: T[]) => {
    if (val === null) return false;
    if (!pool.includes(val)) return false;

    return true;
}

/**
 * Validates user input value (name, surname)
 * @param {string | null} val The name to validate
 * @returns {boolean} Whether the name is valid
 */
export const validateName = (val: string | null) => {
    return (val !== null && val.length > 0 && /^[a-zA-Z ]+$/.test(val));
}
