import * as React from "react";
import { Connected } from "./../../lib/store/connected.mixin";
import { RouteComponentProps, Route } from "react-router";
import { AppStore } from "./../../lib/appStore";
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, Button, Paper } from "@material-ui/core"
import withRoot from "./../../withRoot";
import HeaderComponent from "../header/header";
import { StickerEntity } from "./../../services/client/stickerService";
import { WebAPI } from "./../../services/webAPI";
import StickerComponent from "./../../components/sticker";
import FooterComponent from "../footer/footer";
import { toast } from "react-toastify";

const styles = (theme: Theme) =>
    createStyles
        ({
            root:
            {
                display: "flex",
                "& > *": {
                    flexGrow: 1,
                    flexDirection: "column",
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.primary.main,
                    minHeight: "100vh"
                }
            },
            content: {
                display: "flex",
                flexGrow: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
            },
            cards: {
                alignSelf: "flex-start"
            },
        })

interface IState {
    stickerArray: StickerEntity[];
}

interface IProps {

}
class Stickers extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
    constructor(props: IProps & WithStyles<typeof styles>) {
        super(props);

        this.state =
        {
            stickerArray: []
        }
    }
    componentWillMount = async (): Promise<void> => {
        const stickersDB: StickerEntity[] = await WebAPI.Sticker.all().then(x => x);
        this.setState
            ({
                ...this.state,
                stickerArray: stickersDB
            });
    }

    render() {
        const css = this.props.classes;
        const stickerArrayElement: JSX.Element[] = this.state.stickerArray.map
            (
                x => <Route key={x.Id} render={props => <StickerComponent sticker={x} {...props} />} />
            );

        const Body = () =>
            <React.Fragment>
                <Route render={props => <HeaderComponent {...props} />} />
                <div className={css.root}>
                    <div className={css.cards}>
                        <div className={css.content}>
                            {stickerArrayElement}
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </React.Fragment>
        return Body();
    }
}

const StickersPage = withRoot(withStyles(styles)(Stickers));
export default StickersPage;