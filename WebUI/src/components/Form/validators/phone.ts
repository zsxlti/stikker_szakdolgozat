import { IValues } from "./../interfaces/IValues";

/*
 * Validates whether a field is a valid phone number
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
export const isPhoneNumber = (values: IValues, fieldName: string) : string =>
    values[fieldName] &&
    values[fieldName].search(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/)
    ? "This must be in a valid phone format"
    : "";
