import * as React from "react";
import { createStyles, Theme, withStyles, WithStyles, MuiThemeProvider } from "@material-ui/core";
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
import { BrowserView, MobileView, isMobile, isMobileOnly, isTablet } from "react-device-detect";
import HamburgerMenu from "react-hamburger-menu";


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
            hamburgerMenu:
            {
                backgroundColor: theme.palette.primary.main,
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "flex-end",
                marginRight: 10
            },
            mobileHeader:
            {
                backgroundColor: theme.palette.primary.main,
                display: "flex",
                flexGrow: 1,
            },
            mobileHeaderCart:
            {
                backgroundColor: theme.palette.primary.main,
                display: "flex",
                flexGrow: 1,
                justifyContent:"flex-end"
            }
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
    open: boolean;
    isOpen:boolean;
}
const baseUrl = "localhost:7777";

interface IProps {

}

class Header extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>) {
        super(props);

        this.state = {
            isLoggedIn: true,
            loginStateText: "Kijelentkezés",
            cartCount: this.store.state.cart.content().length,
            open: false,
            isOpen: false,
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

    handleClick = () =>
        this.setState({
            open: !this.state.open
        })

    render() {
        const css = this.props.classes;
        const cartCount = this.state.cartCount;


        const Body = () => {
            if (isMobileOnly) {
                return <React.Fragment>
                    <div className={css.mobileHeader}>
                        <img src={LocalImages.images("./stikker_menu.png")} className={css.logoContainer} onClick={this.stickerClickHandler} />
                        <IconButton aria-label="cart" className={css.mobileHeaderCart}>
                            <StyledBadge badgeContent={cartCount} onClick={this.cartClickHandler} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                        <div className={css.hamburgerMenu}>
                            <HamburgerMenu
                                isOpen={this.state.open}
                                menuClicked={this.handleClick.bind(this)}
                                width={24}
                                height={20}
                                strokeWidth={3}
                                rotate={0}
                                color="#FDB927"
                                borderRadius={0}
                                animationDuration={0.5}
                            />
                        </div>
                        <div className={(this.state.open ? 'show' : 'hidden')}>
                            <ul>
                                <li>Home</li>
                                <li>About Me</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                    </div>
                </React.Fragment>
            }
            else {
                return <React.Fragment><AppBar position="static" className={css.appbar}>
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
                </AppBar></React.Fragment>
            }
        }
        return Body();
    }
}

const HeaderComponent = withRoot(withStyles(styles)(Header));
export default HeaderComponent;