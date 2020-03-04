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
import { Connected } from "./../../lib/store/connected.mixin";
import { AppStore } from "./../../lib/appStore";
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
                width: 196,
                height: 100
            },
            appbar: {
                backgroundColor: theme.palette.primary.main + "!important",
            },
            title: {
                display: "flex",
                flexGrow: 1,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.main,

            },
            button: {
                color: theme.palette.secondary.main,
                alignContent: "flex-end",
            },
            span: {
                color: theme.palette.secondary.main,
                alignContent: "flex-end",
                fontFamily: "Roboto",
                marginRight: 15,
                fontWeight: "bold"
            }
        });
const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.secondary.main}`,
            padding: '0 4px',
            backgroundColor: theme.palette.secondary.main
        },
    }),
)(Badge);
interface IState {
    isLoggedIn: boolean;
    loginStateText: string;
    cartCount: number;
}
const baseUrl = "localhost:7777";

interface IProps { }

class Header extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>) {
        super(props);

        this.state = {
            isLoggedIn: true,
            loginStateText: "Kijelentkezés",
            cartCount: this.store.state.cart.content().length
        }
        this.store.state.cart.count$.subscribe((data) => {
            this.setState
                ({
                    ...this.state,
                    cartCount: data
                });
            console.log("header state: " + this.state.cartCount);
        });
    }

    logoutClickHandler = (): void => {
        const storage: StorageService = new StorageService();
        storage.remove(StorageKeys.JWT);

        this.props.history.push(Routes.Home);
    }

    cartClickHandler = (): void => {
        this.props.history.push(Routes.Cart);
    }

    stickerClickHandler = (): void => {
        this.props.history.push(Routes.Stickers);
    }
    render() {
        const css = this.props.classes;
        const cartCount = this.state.cartCount;

        const Body = () =>
            <div className={css.container}>

                <AppBar position="static" className={css.appbar}>
                    <Toolbar>
                        <img src={LocalImages.images("./stikker_menu.png")} className={css.logoContainer} />
                        <Typography variant="h6" onClick={this.stickerClickHandler} className={css.title}>
                            Matricák
                        </Typography>
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={cartCount} onClick={this.cartClickHandler} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                        <Button className={css.button} onClick={this.logoutClickHandler}>{this.state.loginStateText}</Button>
                    </Toolbar>
                </AppBar>
            </div>
        return Body();
    }
}

const HeaderComponent = withRoot(withStyles(styles)(Header));
export default HeaderComponent;