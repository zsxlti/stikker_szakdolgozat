import * as React from "react";

import { IFieldProps } from "../interfaces/IFieldProps";
import { IErrors } from "../interfaces/IErrors";
import { FormContext, IFormContext } from "../interfaces/IFormContext";
import { IValues } from "./../interfaces/IValues";

import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { Select, GenericSelect } from "./Select/select.generic";
import { RadioGroup, FormControlLabel, Checkbox, Button } from "@material-ui/core";
import RadioComponent from "./Radio/radio.styled";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let _dates:IValues = {};

function storeDate(date: string, key: string): void
{
  _dates[key] = date;
}

function retreiveDate(key: string): string
{
  return _dates[key];
}

export const Field: React.SFC<IFieldProps> = ({
  id,
  label,
  editor,
  options,
  value,
  selectData
}) => {
  /*
   * Gets the validation error for the field
   * @param {IErrors} errors - All the errors from the form
   * @returns {string[]} - The validation error
   */
  const getError = (errors: IErrors): string => (errors ? errors[id] : "");

  /*
   * Gets the inline styles for editor
   * @param {IErrors} errors - All the errors from the form
   * @returns {any} - The style object
   */
  const getEditorStyle = (errors: IErrors): any => getError(errors) ? { borderColor: "red" } : {};

  /*
  *  Creates the generic select element that datasource implement {Id: number, Name: string} fields
  */
  const SelectElement: Select<{Id: number | undefined, Name: string | undefined}> = GenericSelect;

  function formatDate(date: Date) : string
  {
      const day: string = pad(date.getDate(), 2);
      const month: string = pad(date.getMonth() + 1, 2);
      const year: string = pad(date.getFullYear(), 4);
      return `${year}-${month}-${day}`;
  }

  function pad(num: number, size: number) : string
  {
      const s = "000000000" + num;
      return s.substr(s.length - size);
  }

  return (
    <FormContext.Consumer>
      {(context: IFormContext  | undefined) => (
        <div className="form-group">
          {label && <InputLabel htmlFor={id}>{label}</InputLabel>}

          {editor!.toLowerCase() === "textbox" && (
            <TextField
              id={id}
              type="text"
              variant="filled"
              fullWidth={true}
              value={value}
              margin="normal"
              onChange={ (e:React.ChangeEvent<HTMLInputElement>) => context!.setValues({ [id]: e.currentTarget.value }, id)}
              onBlur={() => context!.validate(id)}
              style={getEditorStyle(context!.errors)}
            />
          )}

          {editor!.toLowerCase() === "multilinetextbox" && (
            <TextField
              id={id}
              type="text"
              variant="filled"
              fullWidth={true}
              multiline={true}
              rows={5}
              rowsMax={10}
              value={value}
              margin="normal"
              onChange={ (e:React.ChangeEvent<HTMLInputElement>) => context!.setValues({ [id]: e.currentTarget.value }, id) }
              onBlur={() => context!.validate(id)}
              style={getEditorStyle(context!.errors)}
            />
          )}

          {editor!.toLowerCase() === "dropdown" && (
            <SelectElement
              id={id}
              name={id}
              selectedValue={value}
              data={selectData ? selectData : []}
              onChange={(e: {Id: number | undefined, Name: string | undefined}) =>
              {
                context!.setValues({ [id]: e.Id!.toString() }, id);
                context!.validate(id);
              }}
              onBlur={(e: {Id: number | undefined, Name: string | undefined}) =>
              {
                context!.setValues({ [id]: e.Id!.toString() }, id);
                context!.validate(id)
              }}
              displayMember={x => x.Name!}
              valueMember={x => x.Id!.toString()}
              style={getEditorStyle(context!.errors)}
            />
          )}

          {editor!.toLowerCase() === "radio" && (
            <RadioGroup
              id={id}
              defaultValue={options![0]} 
              aria-label={name} 
              name={id}
              value={value}
              onBlur={() => context!.validate(id)}
              onChange={(e: React.ChangeEvent<{}>) => context!.setValues({ [id]: (e.currentTarget as HTMLInputElement).value }, id)} >
              {options && options.map((option, i) => (
                  <FormControlLabel 
                    key={`${option}-${i}`}
                    value={option}
                    control={<RadioComponent id={`${i}-${option}`}/>}
                    label={option}/>
                ))}
            </RadioGroup>
          )}
          
          {editor!.toLowerCase() === "checkbox" && (
            <Checkbox
              id={id}
              name={id}
              checked={value}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => context!.setValues({ [id]: e.currentTarget.checked }, id)}
              onBlur={() => context!.validate(id)}
              value={value}
              color="primary"
            />
          )}

          {editor!.toLowerCase() === "date" && (value instanceof Date) && (           
            <DatePicker
              id={id}
              name={id}
              todayButton={"Today"}
              value={retreiveDate(id) ? retreiveDate(id) : formatDate(new Date())}
              selected={retreiveDate(id) ? new Date(retreiveDate(id)) : (new Date())}
              onChange={(eDate: Date, e: React.SyntheticEvent<any, Event>) =>
              {
                context!.setValues({ [id]: formatDate(eDate) }, id);
                storeDate(formatDate(eDate), id);
              }}
              onBlur={() =>
              {
                context!.validate(id);
                context!.setValues({ [id]: retreiveDate(id) }, id);
              }}
              minDate={new Date(0, 0, 0, 0, 0, 0, 0)}
              disabledKeyboardNavigation />
          )}

          {editor!.toLowerCase() === "image" && (
            <div>
              <input
                accept="image/*"
                style={{display: "none"}} 
                id={id}
                name={id}
                multiple
                type="file"
                onChange={ (e:React.ChangeEvent<HTMLInputElement>) =>
                {
                  context!.setValues({ [id]: e.currentTarget.value }, id);
                }}
                onBlur={() => context!.validate(id)}
              />
              <label htmlFor={id}>
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              <div style={{ color: "blue", fontSize: "70%" }}>
                  <p>{context!.values[id]}</p>
              </div>
            </div>
          )}
          
          {getError(context!.errors) && (
            <div style={{ color: "red", fontSize: "80%" }}>
              <p>{getError(context!.errors)}</p>
            </div>
          )}
        </div>
      )}
    </FormContext.Consumer>
  );
};
Field.defaultProps = {
  editor: "textbox"
};
