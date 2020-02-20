import * as React from "react";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import withRoot from "./../../withRoot";
import 'typeface-roboto';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { StorageService } from "./../../services/client/storage.service";
import { StorageKeys } from "./../../settings/constans";
import { Routes } from "./../../routing/urls";
import { RouteComponentProps } from "react-router";
import { LocalImages } from "./../../staticFiles/images";

const styles = (theme: Theme) =>
    createStyles
        ({
            container:
            {
                display: "flex",
                flexGrow: 1,
            },
            logoContainer:
            {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "30px",
            },
            appbar: {
                backgroundColor: theme.palette.primary.main + "!important",
            },
            title: {
                flexGrow: 1,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                fontStyle: "Roboto !important"
            },
            button: {
                color: theme.palette.secondary.main,
            }
        });

interface IState {
    isLoggedIn: boolean;
    loginStateText: string;
}

interface IProps { }

class Header extends React.Component<IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState>
{
    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>) {
        super(props);

        this.state = {
            isLoggedIn: true,
            loginStateText: "Kijelentkezés",
        }
    }

    logoutClickHandler = (): void => {
        const storage: StorageService = new StorageService();
        storage.remove(StorageKeys.JWT);

        this.props.history.push(Routes.Home);
    }

    render() {
        const css = this.props.classes;
        const Body = () =>
            <div className={css.container}>
                
                <AppBar position="static" className={css.appbar}>
                    <Toolbar>
                    
              <img src={LocalImages.images("./stikker_menu.png")}  className={css.logoContainer} />
            
                        <Typography variant="h6" className={css.title}>
                            Matricák
                        </Typography>
                        <Button className={css.button} onClick={this.logoutClickHandler}>{this.state.loginStateText}</Button>
                    </Toolbar>
                </AppBar>
            </div>
        return Body();
    }
}

const HeaderComponent = withRoot(withStyles(styles)(Header));
export default HeaderComponent;