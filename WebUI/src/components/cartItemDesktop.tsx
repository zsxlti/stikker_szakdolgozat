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
            rootDesktop: {
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
                flexWrap: "wrap",
                width: "50%",
                marginBottom: "5px"
            },
            itemDesktop:
            {
                display: "flex",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
                alignItems: "center",
                justifyContent: "center"
            },
            mediaDesktop: {
                display: "flex",
                flexGrow: 1,
                minWidth: 100,
                minHeight: 100,
                maxWidth: 100,
                maxHeight: 100,
                border: theme.palette.primary.main,
                borderRadius: "5px"
            },
            descriptionDesktop: {
                display: "flex",
                flexGrow: 3,
                color: theme.palette.secondary.main,
                fontSize: 24,
                marginLeft: 50,
            },
            priceDesktop: {
                display: "flex",
                flexGrow: 1,
                justifyContent: "flex-end",
                color: theme.palette.secondary.main,
                fontSize: 24,
                marginLeft: 50
            },
            deleteButtonDesktop: {
                display: "flex",
                flexGrow: 1,
                justifyContent: "flex-end",
            }
        });
interface IState { }

interface IProps {
    sticker: StickerEntity;
}

class CartItemDesktop extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
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
            <Card className={css.rootDesktop}>
                <CardContent className={css.itemDesktop}>
                    <CardMedia
                        className={css.mediaDesktop}
                        image={this.props.sticker.URL}
                    />
                    <Typography variant="body2" component="p" className={css.descriptionDesktop}>
                        {this.props.sticker.Description}
                    </Typography><br />
                    <Typography variant="body2" component="p" className={css.priceDesktop}>
                        {this.props.sticker.Price} Ft
                    </Typography>
                    <Grid item xs={2} className={css.deleteButtonDesktop}>
                        <DeleteForeverIcon fontSize="large" onClick={this.removeSticker} />
                    </Grid>
                </CardContent>
            </Card>

        return Body();
    }
}

const CartItemDesktopComponent = withRoot(withStyles(styles)(CartItemDesktop));
export default CartItemDesktopComponent;