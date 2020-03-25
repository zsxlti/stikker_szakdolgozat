import * as React from "react";
import { createStyles, Theme, withStyles, WithStyles, MuiThemeProvider } from "@material-ui/core";
import withRoot from "./../../withRoot";
import "typeface-roboto";
import { RouteComponentProps, Route } from "react-router";
import { LocalImages } from "./../../staticFiles/images";
import { Connected } from "./../../lib/store/connected.mixin";
import { AppStore } from "./../../lib/appStore";
import { BrowserView, MobileView, isMobile, isMobileOnly, isTablet, isAndroid, isBrowser } from "react-device-detect";
import MobileHeaderComponent from "../../components/header/mobileHeader";
import DesktopHeaderComponent from "../../components/header/desktopHeader";

const styles = (theme: Theme) =>
    createStyles
        ({});

interface IState { }

const baseUrl = "localhost:7777";

interface IProps { }

class Header extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>) {
        super(props);
        this.state = {
        }
    }

    render() {
        const css = this.props.classes;
        const Body = () => {
            if (isTablet) {
                return <React.Fragment><Route render={props => <DesktopHeaderComponent {...props} />} /></React.Fragment>
            }
            else if (isMobileOnly) {
                return <React.Fragment><Route render={props => <MobileHeaderComponent {...props} />} /></React.Fragment>
            }
            else {
                return <React.Fragment><Route render={props => <DesktopHeaderComponent {...props} />} /></React.Fragment>
            }
        }
        return Body();
    }
}

const HeaderComponent = withRoot(withStyles(styles)(Header));
export default HeaderComponent;