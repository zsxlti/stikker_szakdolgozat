import * as React from "react";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import withRoot from "./../../withRoot";
import "typeface-roboto";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { StorageService } from "./../../services/client/storage.service";
import { StorageKeys } from "./../../settings/constans";
import { Routes, Urls } from "./../../routing/urls";
import { RouteComponentProps } from "react-router";
import { LocalImages } from "./../../staticFiles/images";
import { Connected } from "./../../lib/store/connected.mixin";
import { AppStore } from "./../../lib/appStore";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { isAdmin } from "./../../services/client/roleService";
import { BrowserView, MobileView, isMobile } from "react-device-detect";


const styles = (theme: Theme) =>
    createStyles
        ({
            container:
            {

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
                flexGrow: 1,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                marginLeft: 10
            },
            button: {
                color: theme.palette.secondary.main,
            },
            right: {
                display: "flex",
                justifyContent: "flex-end",
            },
            menuButton: {
                marginRight: 10,
            },
        });

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.secondary.main}`,
            padding: "0 4px",
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
        this.store.state.cart.clear();
        this.props.history.push(Urls.home);
    }

    cartClickHandler = (): void => {
        this.props.history.push(Urls.cart);
    }

    stickerClickHandler = (): void => {
        this.props.history.push(Urls.stickers);
    }

    adminClickHandler = (): void => {
        console.log(isAdmin());
        if (isAdmin()) {
            this.props.history.push(Urls.addSticker);
        }
    }

    render() {
        const css = this.props.classes;
        const cartCount = this.state.cartCount;
    
        const Body = () =>
        <div className={css.container}>
        <AppBar position="static" className={css.appbar}>
            <Toolbar>
            <img src={LocalImages.images("./stikker_menu.png")} className={css.logoContainer} onClick={this.stickerClickHandler} />
                <Typography variant="h6" onClick={this.stickerClickHandler} className={css.title}>
                    Matricák
                </Typography>
               {isAdmin() && <Typography variant="h6" onClick={this.adminClickHandler} className={css.title}>
                    Admin
                </Typography>}
                <IconButton aria-label="cart" className={css.right}>
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