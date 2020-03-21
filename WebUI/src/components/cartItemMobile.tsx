import * as React from "react";
import { Theme, createStyles, withStyles, WithStyles, withWidth, Card, CardContent, Typography, CardActions, Button, CardMedia, Grid } from "@material-ui/core"
import withRoot from "../withRoot";
import { StickerEntity } from "../services/client/stickerService";
import { Connected } from "../lib/store/connected.mixin";
import { RouteComponentProps, Route } from "react-router";
import { AppStore } from "../lib/appStore";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { isMobile, isMobileOnly } from "react-device-detect";

const styles = (theme: Theme) =>
    createStyles
        ({
            rootMobile: {
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
                flexWrap: "wrap",
                marginBottom: "5px",
                minWidth: 300,
                maxWidth: 300,
                justifyContent: "center"
            },
            itemMobile:
            {
                display: "flex",
                flexDirection: "column",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                alignItems: "center",
                justifyContent: "center"
            },
            mediaMobile: {
                display: "flex",
                flexDirection: "column",
                minWidth: 100,
                minHeight: 100,
                maxWidth: 100,
                maxHeight: 100,
                border: theme.palette.primary.main,
                borderRadius: "5px"
            },
            descriptionMobile: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                color: theme.palette.secondary.main,
                fontSize: 24,
            },
            priceMobile: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: theme.palette.secondary.main,
                fontSize: 24,
            },
            deleteButtonMobile: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            },
        });
interface IState { }

interface IProps {
    sticker: StickerEntity;
}

class CartItemMobile extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>) {
        super(props);
    }

    removeSticker = (): void => {
        const data: StickerEntity = this.props.sticker;
        this.store.update({
            selectedSticker: data
        });
        this.store.state.cart.remove(data);
    }

    render() {
        const css = this.props.classes;
        const Body = () =>
            <Card className={css.rootMobile}>
                <CardContent className={css.itemMobile}>
                    <CardMedia
                        className={css.mediaMobile}
                        image={this.props.sticker.URL}
                    />
                    <Typography variant="body2" component="p" className={css.descriptionMobile}>
                        {this.props.sticker.Description}
                    </Typography><br />
                    <Typography variant="body2" component="p" className={css.priceMobile}>
                        {this.props.sticker.Price} Ft
                    </Typography>
                    <Grid item xs={2} className={css.deleteButtonMobile}>
                        <DeleteForeverIcon fontSize="large" onClick={this.removeSticker} />
                    </Grid>
                </CardContent>
            </Card>

        return Body();
    }
}

const CartItemMobileComponent = withRoot(withStyles(styles)(CartItemMobile));
export default CartItemMobileComponent;