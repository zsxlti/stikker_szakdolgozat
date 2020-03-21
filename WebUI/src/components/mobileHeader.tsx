import * as React from "react";
import { Connected } from "./../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "./../lib/appStore";
import { Theme, createStyles, withStyles, WithStyles, Typography, Button, AppBar, Toolbar, IconButton, Drawer, Badge } from "@material-ui/core"
import withRoot from "./../withRoot";
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { LocalImages } from "./../staticFiles/images";
import { StorageService } from "./../services/client/storage.service";
import { StorageKeys } from "./../settings/constans";
import { Urls } from "./../routing/urls";
import { isAdmin } from "./../services/client/roleService";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const styles = (theme: Theme) =>
    createStyles
        ({
            root: {
                display:"flex",
                flexDirection:"column",
                flexGrow:1
            },
            menuButton: {
                flexGrow:1,
                color:theme.palette.secondary.main
            },
            logoContainer:
            {
                flexGrow:3,
                width: 196,
                height: 120
            },
            right: {
                display: "flex",
                flexGrow:1,
                justifyContent:"flex-end"
            },
            drawerPaper: {
                backgroundColor:theme.palette.primary.main,
            },
            drawerHeader:
            {
                color:theme.palette.secondary.main
            },
            drawerInner:
            {
                display:"flex",
                flexGrow:1,
                flexDirection:"column",
                justifyContent:"center",
                color:theme.palette.secondary.main
            },
            button:
            {
                color:theme.palette.secondary.main
            }

        })
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
    drawerIsOpen: boolean;
    loginStateText: string;
    cartCount: number;
}

interface IProps { }


class mobileHeader extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>) {
        super(props);

        this.state =
        {
            drawerIsOpen: false,
            loginStateText: "Kijelentkezés",
            cartCount: this.store.state.cart.content().length,
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

    handleDrawerOpen = () => {
        this.setState({ drawerIsOpen: true });
    };

    handleDrawerClose = () => {
        this.setState({ drawerIsOpen: false });
    };

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
        const { classes } = this.props;
        const cartCount = this.state.cartCount;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} onClick={this.handleDrawerOpen}  aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <img src={LocalImages.images("./stikker_menu.png")} className={classes.logoContainer} onClick={this.stickerClickHandler} />
                        <IconButton aria-label="cart" className={classes.right}>
                            <StyledBadge badgeContent={cartCount} onClick={this.cartClickHandler} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer
                    variant="persistent"
                    anchor="top"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    
                    open={this.state.drawerIsOpen}
                >
                    <div >
                        <IconButton className={classes.drawerHeader}  onClick={this.handleDrawerClose}>
                            <KeyboardArrowUpIcon />
                        </IconButton>
                    </div>
                    <div className={classes.drawerInner}>
                        <Button className={classes.button} onClick={this.stickerClickHandler}>Matricák</Button><br/>
                        {isAdmin() &&<Button className={classes.button} onClick={this.adminClickHandler}>
                            Admin
                            </Button>}
                        <br/> 
                        
                        <Button className={classes.button} onClick={this.logoutClickHandler}>{this.state.loginStateText}</Button>

                    </div>
                </Drawer>
            </div>
        );
    }
}

const MobileHeaderComponent = withRoot(withStyles(styles)(mobileHeader));
export default MobileHeaderComponent;