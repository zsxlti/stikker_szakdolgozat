import { IValues } from "../interfaces/IValues";

/**
 * Validates whether a field is within a certain amount of characters
 * @param {IValues} values - All the field values in the form
 * @param {string} fieldName - The field to validate
 * @param {number} length - The maximum number of characters
 * @returns {string} - The error message
 */
export const minValue = (values: IValues, fieldName: string, value: number): string =>
    values[fieldName] && Number.parseFloat(values[fieldName]) < value
      ? `This can not bee less then ${value}.`
      : "";