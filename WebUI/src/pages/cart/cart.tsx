import * as React from "react";
import { Connected } from "./../../lib/store/connected.mixin";
import { RouteComponentProps, Route } from "react-router";
import { AppStore } from "./../../lib/appStore";
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, Button } from "@material-ui/core"
import withRoot from "./../../withRoot";
import { Routes } from "./../../routing/urls";
import HeaderComponent from "../header/header";
import { StickerEntity } from "./../../services/client/stickerService";
import CartEntryComponent from "./../../components/cartItem";

import { number } from "prop-types";

const styles = (theme: Theme) =>
  createStyles
  ({
    container:
    {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.main
    },
    cartText:
    {
        color: "#33ff00",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    cost:
    {
        display: "flex",
        border: "3px solid #33ff00",
        justifyContent: "center",
        borderRadius: 15,
        color: "#33ff00",
        padding: 10
    }
  })

interface IState
{
    stickers: StickerEntity[]
}

interface IProps
{}


class Cart extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>)
    {
        super(props);

        this.state =
        {
            stickers : this.store.state.cart.content(),
        }
    }

    sumCost = () : number | undefined =>
    {
        const sum:number | undefined = this.state.stickers.toEnum().Sum
        (
          x => x.Price!
        );
        return sum;
    }

    calcAfa= () : number | undefined =>
    {
        const afa:number | undefined = (this.sumCost()! * 0.27);
        return Math.round(afa);
    }

    render()
    {
        const css = this.props.classes;
        const stickers:JSX.Element[] = this.state.stickers.map
        (
          x => <Route key={x.Id} render={ props => <CartEntryComponent sticker={x} {...props}/> }/>
        );

        const Body = () =>
            <div className={css.container}>
                <Route render={ props => <HeaderComponent {...props}/> }/>
                {stickers}
                <div className={css.cost}>
                    Végösszeg: {this.sumCost()}<br/>
                    Áfa(27%): {this.calcAfa()}
                </div>
            </div>
        
        return Body();
    }
}

const CartPage = withRoot(withStyles(styles)(Cart));
export default CartPage;