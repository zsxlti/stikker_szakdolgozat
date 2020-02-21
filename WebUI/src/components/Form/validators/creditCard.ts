import { IValues } from "./../interfaces/IValues";

/*
 * Validates whether a field is a valid credit card number
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @returns {string} - The error message
 */
export const isCreditCard = (values: IValues, fieldName: string) : string =>
    values[fieldName] &&
    values[fieldName].search(/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9][0-9])[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35\d{3})\d{11}))$/)
    ? "This must be in a valid credti card number"
    : "";
