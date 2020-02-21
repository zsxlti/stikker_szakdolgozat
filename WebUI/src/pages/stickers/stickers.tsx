import * as React from "react";
import { Connected } from "./../../lib/store/connected.mixin";
import { RouteComponentProps, Route } from "react-router";
import { AppStore } from "./../../lib/appStore";
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, Button, Paper } from "@material-ui/core"
import withRoot from "./../../withRoot";
import HeaderComponent from "../header/header";

const styles = (theme: Theme) =>
    createStyles
        ({
            root:
            {
                display: "flex",
                "& > *": {
                    flexGrow: 1,
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.primary.main,
                    justifyContent: "center",
                }
            },
            content:{
                display:"flex",
                flexGrow:1,
                flexDirection:"row"
            }
        })
interface IState {

}

interface IProps {

}
class Stickers extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>) {
        super(props);

        this.state =
        {

        }
    }
    render() {
        const css = this.props.classes;

        const Body = () =>
            <React.Fragment>
                <Route render={props => <HeaderComponent {...props} />} />
                <div className={css.root}>
                <div >

                </div>
                </div>
            </React.Fragment>
        return Body();
    }
}

const StickersPage = withRoot(withStyles(styles)(Stickers));
export default StickersPage;