import * as React from "react";

import { IFormState } from "./IFormState";
import { IValues } from "./IValues";

export interface IFormContext extends IFormState
{
  /* Function that allows values in the values state to be set */
  setValues: (values: IValues, filed?: string) => Promise<void>;

  /* Function that validates a field */
  validate: (fieldName: string) => void;
}

/* 
* The context which allows state and functions to be shared with Field.
* Note that we need to pass createContext a default value which is why undefined is unioned in the type
*/
export const FormContext = React.createContext<IFormContext | undefined>(undefined);

