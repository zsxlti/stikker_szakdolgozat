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
import HeaderComponent from "./../../../../pages/header/header";
import FooterComponent from "./../../../../pages/footer/footer";
import { minLength } from "./../../../../components/Form/validators/minLength";
import { StickerEntity } from "./../../../../services/client/stickerService";
import { WebAPI } from "./../../../../services/webAPI";

const styles = (theme: Theme) =>
    createStyles
        ({
            container: {
                backgroundColor: theme.palette.secondary.main,
                height: "100vh",
                color: theme.palette.primary.main
            },
            alert: {
                fontFamily: "Roboto",
                fontSize: "20px",
                marginTop: 20,
                marginBottom: 20
            },
        })

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
                label: "URL"
            },
            price:
            {
                id: FieldTypes.price.toLowerCase(),
                label: "Ár",
                validation: [{ rule: minLength, args: 0 }, { rule: required }]
            },
            description:
            {
                id: FieldTypes.description.toLowerCase(),
                label: "Matrica leírása",
                editor: "multilinetextbox",
            },

        };

    submit = async (): Promise<void> => {
        const data = { ...this.form.current!.state!.values };
        const sticker: StickerEntity = {
            url: data["url"],
            price: data["price"],
            description: data["description"]
        };
        const stickerItem = await WebAPI.Sticker.stickerPost(sticker)
                                         .then(x => x)
                                         .catch();  
    }

    render() {
        const css = this.props.classes;
        const Body = () =>
            <React.Fragment>
                <div className={css.container}>
                    <Route render={props => <HeaderComponent {...props} />} />
                    <Form
                        ref={this.form}
                        submit={() => this.submit()}
                        fields={this.fields}
                        render={() =>
                            (
                                <React.Fragment>
                                    <div className={css.alert} role="alert">
                                        Matrica feltöltéséhez töltse ki az adatokat!
                                    </div>
                                    <Field {...this.fields.url} />
                                    <Field {...this.fields.price} />
                                    <Field {...this.fields.description} />
                                </React.Fragment>
                            )}
                    />
                </div>
                <FooterComponent />
            </React.Fragment>
        return Body();
    }
}

const AddStickerPage = withRoot(withStyles(styles)(AddSticker));
export default AddStickerPage;