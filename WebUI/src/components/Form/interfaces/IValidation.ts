import { IValues } from "./IValues";

export interface IValidation
{
    rule: (values: IValues, fieldName: string, args: any) => string;
    args?: any;
}