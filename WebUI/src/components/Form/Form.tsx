import * as React from "react";

import { IFormState } from "./interfaces/IFormState";
import { IErrors } from "./interfaces/IErrors";
import { IValues } from "./interfaces/IValues";
import { IFormContext, FormContext } from "./interfaces/IFormContext";
import { IFormProps } from "./interfaces/IFormProps ";

export class Form extends React.Component<IFormProps, IFormState>
{
    constructor(props: IFormProps)
    {
      super(props);

      const errors: IErrors = {};
      const values: IValues = {};

      this.state =
      {
        errors,
        values
      };
    }

    /*
     * Returns whether there are any errors in the errors object that is passed in
     * @param {IErrors} errors - The field errors
    */
    private haveErrors = (errors: IErrors) : boolean =>
    {
      let haveError: boolean = false;

      Object.keys(errors).map((key: string) =>
      {
        if (errors[key].length > 0)
        {
          haveError = true;
        }
      });

      return haveError;
    }

    /*
     * Handles form submission
     * @param {React.FormEvent<HTMLFormElement>} e - The form event
    */
    private handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> =>
    {
      e.preventDefault();

      if (this.validateForm())
      {
        const submitSuccess: boolean = await this.submitForm();
        this.setState({ submitSuccess });
      }
    };

    /*
     * Executes the validation rules for all the fields on the form and sets the error state
     * @returns {boolean} - Whether the form is valid or not
    */
    private validateForm = (): boolean =>
    {
      const errors: IErrors = {};

      Object.keys(this.props.fields).map((fieldName: string) =>
      {
        errors[fieldName] = this.validate(fieldName);
      });

      this.setState({ errors });

      return !this.haveErrors(errors);
    }

    /*
    * Executes the validation rule for the field and updates the form errors
    * @param {string} fieldName - The field to validate
    * @returns {string} - The error message
    */
    private validate = (fieldName: string): string =>
    {
      let newError: string = "";

      if (this.props.fields[fieldName] && this.props.fields[fieldName].validation)
      {
        newError = this.props.fields[fieldName].validation!.rule(this.state.values, fieldName, this.props.fields[fieldName].validation!.args);
      }

      this.state.errors[fieldName] = newError;

      this.setState
      ({
        errors:
        {
          ...this.state.errors,
          [fieldName]: newError
        }
      });

      return newError;
    };

    /*
     * Submits the form to the http api
     * @returns {boolean} - Whether the form submission was successful or not
    */
    private submitForm = async (): Promise<boolean> =>
    {
      try
      {
        this.props.submit();
        return true;
      }
      catch(ex)
      {
        return false;
      }
    }

    /*
     * Stores new field values in state
     * @param {IValues} values - The new field values
    */
    private setValues = (values: IValues) =>
    {
      this.setState
      ({
        values:
        {
          ...this.state.values,
          ...values
        }
      });

      console.log("state: " + JSON.stringify(this.state));
    };

    public render()
    {
        const { submitSuccess, errors } = this.state;
        const context: IFormContext = { ...this.state, setValues: this.setValues, validate: this.validate };

        const Body = () =>
          <FormContext.Provider value={context}>
            <form onSubmit={this.handleSubmit} noValidate={true}>
                <div className="container">
                    {
                      /* render fields */
                      this.props.render()
                    }
                    <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={this.haveErrors(errors)}
                    >
                        Submit
                    </button>
                    </div>
                    {
                        submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                        </div>
                    )}
                    {
                        submitSuccess === false &&
                        !this.haveErrors(errors) && (
                        <div className="alert alert-danger" role="alert">
                            Sorry, an unexpected error has occurred
                        </div>
                    )}
                    {
                        submitSuccess === false &&
                        this.haveErrors(errors) && (
                        <div className="alert alert-danger" role="alert">
                            Sorry, the form is invalid. Please review, adjust and try again
                        </div>
                    )}
                </div>
            </form>
          </FormContext.Provider>

        return Body();
    }
  }