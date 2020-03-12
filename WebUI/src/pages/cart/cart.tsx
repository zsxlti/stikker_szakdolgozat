import * as React from "react";
import { Connected } from "./../../lib/store/connected.mixin";
import { RouteComponentProps, Route } from "react-router";
import { AppStore } from "./../../lib/appStore";
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, Button } from "@material-ui/core"
import withRoot from "./../../withRoot";
import HeaderComponent from "../header/header";
import { StickerEntity } from "./../../services/client/stickerService";
import CartEntryComponent from "./../../components/cartItem";
import FooterComponent from "../footer/footer";
import { PurchaseRequest, PurchaseEntity } from "./../../services/client/purchaseService";
import { WebAPI } from "./../../services/webAPI";

const styles = (theme: Theme) =>
    createStyles
        ({
            container:
            {
                display: "flex",
                flexDirection: "column",
                backgroundColor: theme.palette.secondary.main,
                height: "100%",
                position:"inherit",
                alignSelf: "flex-start"
            },
            cost:
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
                display:"flex",
                color:theme.palette.primary.main,
                justifyContent:"center",
                alignItems:"center",
                fontSize:36
            },
            button:
            {
                color:theme.palette.secondary.main,
                marginRight:"10px"
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

    purchaseClickHandler = async (): Promise<void> => {
        const purchaseEntity: PurchaseEntity = {
            CustomerID: "",
            PurchaseDate: new Date((new Date()).getTime()),
        }
        const purchaseRequest: PurchaseRequest = {
            purchase: purchaseEntity,
            stickers: this.store.state.cart.content()
        }
        const purchase = await WebAPI.Purchase.purchasePost(purchaseRequest)
                                              .then(x => x)
                                              .catch();

        console.log(purchase);

        if (purchase) {
            alert("A vásárlás sikeres!");
        }
        else alert("A vásárlás során hiba lépett fel!");
    }

    

    render() {
        const css = this.props.classes;
        const stickers: JSX.Element[] = this.state.stickers.map
            (
                x => <Route key={x.Id} render={props => <CartEntryComponent sticker={x} {...props} />} />
            );

        const priceTag = this.isCartFilled() ?
            <div>
                <div className={css.cost}>
                <Button variant="contained" color="primary" className={css.button} onClick={this.purchaseClickHandler}>
                        Vásárlás elküldése
                    </Button>
                    Végösszeg: {this.sumCost()} Ft<br />
                    Áfa(27%): {this.calcAfa()} Ft
                </div>
            </div>
            :
            <p className={css.emptyCart}>
                Az Ön kosara jelenleg üres!
            </p>

        const Body = () =>
            <React.Fragment>
                <Route render={props => <HeaderComponent {...props} />} />
                <div className={css.container}>
                    <p className={css.p}>A kosár tartalma:</p>
                    <div className={css.div}>{stickers}</div>
                    {priceTag}
                </div>
                <FooterComponent />
            </React.Fragment>
        return Body();
    }
}

const CartPage = withRoot(withStyles(styles)(Cart));
export default CartPage;