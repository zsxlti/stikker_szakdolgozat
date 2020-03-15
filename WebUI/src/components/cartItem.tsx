import * as React from "react";
import { Theme, createStyles, withStyles, WithStyles, withWidth, Card, CardContent, Typography, CardActions, Button, CardMedia, Grid } from "@material-ui/core"
import withRoot from "../withRoot";
import { StickerEntity } from "../services/client/stickerService";
import { Connected } from "../lib/store/connected.mixin";
import { RouteComponentProps, Route } from "react-router";
import { AppStore } from "../lib/appStore";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme: Theme) =>
  createStyles
    ({
      root: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        flexWrap: "wrap",
        width: "50%",
      },
      item:
      {
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        alignItems: "center",
        justifyContent: "center"
      },
      media: {
        width: 100,
        height: 100,
      },
      description: {
        color: theme.palette.secondary.main,
        fontSize: 24,
        marginLeft: 50
      },
      price: {
        color: theme.palette.secondary.main,
        fontSize: 24,
        marginLeft: 50
      },
      deleteButton: {
       display:"flex",
       justifyContent:"flex-end",
      }
    });
interface IState { }

interface IProps {
  sticker: StickerEntity;
}

class CartItem extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
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
      <Card className={css.root}>
        <CardContent className={css.item}>
          <CardMedia
            className={css.media}
            image={this.props.sticker.URL}
          />
          <Typography variant="body2" component="p" className={css.description}>
            {this.props.sticker.Description}
          </Typography><br />
          <Typography variant="body2" component="p" className={css.price}>
            {this.props.sticker.Price} Ft
          </Typography>
          <Grid item xs={2} className={css.deleteButton}>
            <DeleteForeverIcon fontSize="large" onClick={this.removeSticker} />
          </Grid>
        </CardContent>
      </Card>
    return Body();
  }
}

const CartItemComponent = withRoot(withStyles(styles)(CartItem));
export default CartItemComponent;