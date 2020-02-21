import { IFields } from "./IFields";

export interface IFormProps
{
    /* The http path that the form will be posted to */
    submit: () => Promise<void>;

    /* The props for all the fields on the form */
    fields: IFields;

    /* A prop which allows content to be injected */
    render: () => React.ReactNode;
}