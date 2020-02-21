/*import * as React from "react";
import { Connected } from "./../../../../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "./../../../../lib/appStore";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core"
import withRoot from "./../../../../withRoot";
import { Routes } from "./../../../../routing/urls";
import { Form } from "../../../../components/Form/Form";
import { Field } from "../../../../components/Form/component/Field";
import { IFields } from "./../../../../components/Form/interfaces/IFields";
import { required } from "./../../../../components/Form/validators/required";
import { isEmail } from "./../../../../components/Form/validators/email";
import { maxLength } from "./../../../../components/Form/validators/maxLength";

const styles = (theme: Theme) =>
  createStyles
  ({})

interface IState
{}

interface IProps
{}

enum FieldTypes{ name ="Name", email = "Email", reason = "Reason", sex="Sex", notes = "Notes", agree="Agree", startDate="StartDate", endDate="EndDate" }

class AddProduct extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{   
    private form = React.createRef<Form>();

    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>)
    {
        super(props);

        this.state =
        {}
    }

    private data: {Id: number, Name: string}[] =
    [
        {Id: 1, Name: "Select-A"},
        {Id: 2, Name: "Select-B"},
        {Id: 3, Name: "Select-C"},
        {Id: 4, Name: "Select-D"}
    ]

    private fields: IFields =
    {
        name:
        {
            id: FieldTypes.name.toLowerCase(),
            label: "Name",
            validation: { rule: required }
        },
        email:
        {
            id: FieldTypes.email.toLowerCase(),
            label: "Email",
            validation: { rule: isEmail }
        },
        reason:
        {
            id: FieldTypes.reason.toLowerCase(),
            label: "Reason",
            editor: "dropdown",
            validation: { rule: required },
            selectData : this.data
        },
        sex:
        {
            id: FieldTypes.sex.toLowerCase(),
            label: "Sex",
            editor: "radio",
            options: ["Male", "Female"]
        },
        startDate:
        {
            id: FieldTypes.startDate.toLowerCase(),
            label: "Start Date",
            editor: "date",
            value: new Date()
        },
        endDate:
        {
            id: FieldTypes.endDate.toLowerCase(),
            label: "End Date",
            editor: "date",
            value: new Date()
        },
        notes:
        {
            id: FieldTypes.notes.toLowerCase(),
            label: FieldTypes.notes,
            editor: "multilinetextbox",
            validation: { rule: maxLength, args: 1000 }
        },
        agree:
        {
            id: FieldTypes.agree.toLowerCase(),
            label: FieldTypes.agree,
            editor: "checkbox",
            validation: { rule: required}
        }
    };

    submit = async (): Promise<void> =>
    {
        //TODO: delete console.log
        const data = {...this.form.current!.state!.values};
        console.log(data);
    }

    render()
    {
        const css = this.props.classes;

        const Body = () =>
        <Form
            ref={this.form}
            submit={() => this.submit()}
            fields={ this.fields }
            render={() => 
            (
                <React.Fragment>
                    <div className="alert alert-info" role="alert">
                        Enter the information below and we'll get back to you as soon as we can.
                    </div>
                        <Field {...this.fields.name} />
                        <Field {...this.fields.email} />
                        <Field {...this.fields.reason} />
                        <Field {...this.fields.sex} />
                        <Field {...this.fields.startDate} />
                        <Field {...this.fields.endDate} />
                        <Field {...this.fields.notes} />
                        <Field {...this.fields.agree} />
                </React.Fragment>
            )}
        />

        return Body();
    }
}

const AddProductPage = withRoot(withStyles(styles)(AddProduct));
export default AddProductPage;*/