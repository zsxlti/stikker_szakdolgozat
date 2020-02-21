import { IValues } from "./IValues";
import { IErrors } from "./IErrors";

export interface IFormState
{
    /* The field values */
    values: IValues;

    /* The field validation error messages */
    errors: IErrors;

    /* Whether the form has been successfully submitted */
    submitSuccess?: boolean;
}