import * as React from "react";
import { Connected } from "./../../../../lib/store/connected.mixin";
import { RouteComponentProps, Route } from "react-router";
import { AppStore } from "./../../../../lib/appStore";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core"
import withRoot from "./../../../../withRoot";
import { Form } from "../../../../components/Form/Form";
import { Field } from "../../../../components/Form/component/Field";
import { IFields } from "./../../../../components/Form/interfaces/IFields";
import { required } from "./../../../../components/Form/validators/required";
import { maxLength } from "./../../../../components/Form/validators/maxLength";
import HeaderComponent from "./../../../../pages/header/header";
import FooterComponent from "./../../../../pages/footer/footer";
import { StickerEntity } from "./../../../../services/client/stickerService";

const styles = (theme: Theme) =>
    createStyles
        ({})

interface IState {
    /* url:string,
     description:string,
     price:number*/
}

interface IProps { }

enum FieldTypes { url = "URL", description = "Description", price = "Price" }

class AddSticker extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
    private form = React.createRef<Form>();

    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>) {
        super(props);

        this.state =
        {
            /*url:"",
            description:"",
            price:0*/
        }
    }


    private fields: IFields =
        {
            url:
            {
                id: FieldTypes.url.toLowerCase(),
                label: "URL",
                validation: { rule: required }
            },
            price:
            {
                id: FieldTypes.price.toLowerCase(),
                label: "Price",

            },
            description:
            {
                id: FieldTypes.description.toLowerCase(),
                label: FieldTypes.description,
                editor: "multilinetextbox",
                validation: { rule: maxLength, args: 1000 }
            },

        };

    submit = async (): Promise<void> => {
        //TODO: delete console.log
        const data = { ...this.form.current!.state!.values };
        const dataContent = JSON.parse(JSON.stringify(data));
        console.log(dataContent);
        /*const roles: any[] = data

        if (roles.toEnum().Any(x => x.authority === "ROLE_ADMIN")) {
            return true;
        }*/
        const stickerEntity: StickerEntity = {
            
        }
        console.log(data);
    }



    render() {
        const css = this.props.classes;

        const Body = () =>
            <div>
                <Route render={props => <HeaderComponent {...props} />} />
                <Form
                    ref={this.form}
                    submit={() => this.submit()}
                    fields={this.fields}
                    render={() =>
                        (
                            <React.Fragment>
                                <div className="alert alert-info" role="alert">
                                    Enter the information below and we'll get back to you as soon as we can.
                                </div>
                                <Field {...this.fields.url} />
                                <Field {...this.fields.price} />
                                <Field {...this.fields.description} />
                            </React.Fragment>
                        )}
                />
                <FooterComponent />
            </div>
        return Body();
    }
}

const AddStickerPage = withRoot(withStyles(styles)(AddSticker));
export default AddStickerPage;