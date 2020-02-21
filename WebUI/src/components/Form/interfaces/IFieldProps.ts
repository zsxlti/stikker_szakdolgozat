import { Editor } from "../types/Editor";
import { IValidation } from "./IValidation";

export interface IFieldProps
{
    /* The unique field name */
    id: string;
  
    /* The label text for the field */
    label?: string;
  
    /* The editor for the field */
    editor?: Editor;
  
    /* The drop down items for the field */
    options?: string[];
  
    /* The field value */
    value?: any;
  
    /* The field validator function and argument */
    validation?: IValidation;

    /* selectData is an array of obejcts that has an `Id` and `Name` field */
    /* The field is used to populate select with generic type*/
    selectData?: {Id: number, Name: string}[];
  }