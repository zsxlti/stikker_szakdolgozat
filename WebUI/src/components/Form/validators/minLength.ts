import { IValues } from "../interfaces/IValues";

/**
 * Validates whether a field is within a certain amount of characters
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @param {number} length - The maximum number of characters
 * @returns {string} - The error message
 */
export const minLength = (values: IValues, fieldName: string, length: number): string =>
    values[fieldName] && values[fieldName].length < length
      ? `This can not exceed ${length} value.`
      : "";