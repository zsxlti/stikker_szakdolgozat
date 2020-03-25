import * as React from "react";
import { Connected } from "./../../lib/store/connected.mixin";
import { RouteComponentProps, Route } from "react-router";
import { AppStore } from "./../../lib/appStore";
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, Button } from "@material-ui/core"
import withRoot from "./../../withRoot";
import HeaderComponent from "../header/header";
import { StickerEntity } from "./../../services/client/stickerService";
import FooterComponent from "../../components/footer/footer";
import { PurchaseRequest, PurchaseEntity } from "./../../services/client/purchaseService";
import { WebAPI } from "./../../services/webAPI";
import { getUniqueID } from "./../../services/client/roleService";
import { isMobileOnly } from "react-device-detect";
import CartItemMobileComponent from "../../components/cartItem/cartItemMobile";
import CartItemDesktopComponent from "../../components/cartItem/cartItemDesktop";
import { Urls } from "./../../routing/urls";

const styles = (theme: Theme) =>
    createStyles
        ({
            container:
            {
                display: "flex",
                flexDirection: "column",
                backgroundColor: theme.palette.secondary.main,
                height: "100%",
                alignSelf: "flex-start"
            },
            costMobile:
            {
                display: "flex",
                flexDirection: "column",
                color: theme.palette.primary.main,
                padding: 10,
                fontFamily: "Roboto",
                fontSize: 20,
                justifyContent: "center"
            },
            costDesktop:
            {
                display: "flex",
                justifyContent: "flex-end",
                color: theme.palette.primary.main,
                padding: 10,
                fontFamily: "Roboto",
                fontSize: 20,
                marginRight: 50
            },
            p: {
                color: theme.palette.primary.main,
                fontSize: "24px",
                fontFamily: "Roboto",
                height: 36,
                marginLeft: 100
            },
            div: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            },
            emptyCart:
            {
                display: "flex",
                color: theme.palette.primary.main,
                justifyContent: "center",
                alignItems: "center",
                fontSize: 36
            },
            buttonMobile:
            {
                display: "flex",
                color: theme.palette.secondary.main,
                marginBottom: "10px"
            },
            buttonDesktop:
            {
                display: "flex",
                color: theme.palette.secondary.main,
                marginRight: "10px"
            },
            emptyDiv:
            {
                minHeight: "80vh"
            },
            containerMinimum:
            {
                display: "flex",
                flexDirection: "column",
                backgroundColor: theme.palette.secondary.main,
                minHeight: "100vh",
                alignSelf: "flex-start"
            },
            sum:
            {
                display: "flex",
                justifyContent: "flex-end"
            }
        })

interface IState {
    stickers: StickerEntity[]
}

interface IProps { }

class Cart extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>) {
        super(props);

        this.state =
        {
            stickers: this.store.state.cart.content(),
        }
    }

    sumCost = (): number | undefined => {
        const sum: number | undefined = this.state.stickers.toEnum().Sum
            (
                x => x.Price!
            );
        return sum;
    }

    calcAfa = (): number | undefined => {
        const afa: number | undefined = (this.sumCost()! * 0.27);
        return Math.round(afa);
    }

    isCartFilled = (): boolean => {
        return this.store.state.cart.content().length !== 0 ? true : false;
    }

    isCartCount = (): boolean => {
        return this.store.state.cart.content().length >= 4 ? true : false;
    }

    purchaseClickHandler = async (): Promise<void> => {
        const purchaseEntity: PurchaseEntity = {
            CustomerID: getUniqueID(),
            PurchaseDate: new Date((new Date()).getTime()),
        }
        const purchaseRequest: PurchaseRequest = {
            purchase: purchaseEntity,
            stickers: this.store.state.cart.content()
        }
        const purchase = await WebAPI.Purchase.purchasePost(purchaseRequest)
                                              .then(x => x);
        if (purchase) {
            this.store.state.cart.clear();
            this.props.history.push(Urls.stickers);
            alert("A vásárlás sikeres!");
        }
        else alert("A vásárlás során hiba lépett fel!");
    }

    clearCartContent = async (): Promise<void> => {
        this.store.state.cart.clear();
        console.log(this.store.state.cart.content());
        this.setState({
            ...this.state,
            stickers: []
        });
    }

    render() {
        const css = this.props.classes;
        const stickers: JSX.Element[] = isMobileOnly ? this.state.stickers.map
            (
                x => <Route key={x.Id} render={props => <CartItemMobileComponent sticker={x} {...props} />} />
            )
            :
            this.state.stickers.map
            (
                    x => <Route key={x.Id} render={props => <CartItemDesktopComponent sticker={x} {...props} />} />
            );

        const priceTag = this.isCartFilled() ?
            <div>
                <div className={isMobileOnly ? css.costMobile : css.costDesktop}>
                    <Button variant="contained" color="primary" className={isMobileOnly ? css.buttonMobile : css.buttonDesktop} onClick={this.purchaseClickHandler}>
                        Vásárlás befejezése
                    </Button>
                    <Button variant="contained" color="primary" className={isMobileOnly ? css.buttonMobile : css.buttonDesktop} onClick={this.clearCartContent}>
                        A kosár ürítése
                    </Button>
                    <div className={css.sum}>
                        Végösszeg: {this.sumCost()} Ft<br />
                    Áfa(27%): {this.calcAfa()} Ft
                    </div>
                </div>
            </div>
            :
            <div className={css.emptyDiv}>
                <p className={css.emptyCart}>
                    Az Ön kosara jelenleg üres!
            </p>
            </div>

        const cartContent = this.isCartCount() ?
            <div className={css.container}>
                <p className={css.p}>A kosár tartalma:</p>
                <div className={css.div}>{stickers}</div>
                {priceTag}
            </div>
            :
            <div className={css.containerMinimum}>
                <p className={css.p}>A kosár tartalma:</p>
                <div className={css.div}>{stickers}</div>
                {priceTag}
            </div>
            
        const Body = () =>
            <React.Fragment>
                <Route render={props => <HeaderComponent {...props} />} />
                {cartContent}
                <FooterComponent />
            </React.Fragment>
        return Body();
    }
}

const CartPage = withRoot(withStyles(styles)(Cart));
export default CartPage;