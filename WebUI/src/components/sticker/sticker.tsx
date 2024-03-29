import * as React from "react";
import { Theme, createStyles, withStyles, WithStyles, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core"
import withRoot from "../../withRoot";
import { StickerEntity } from "../../services/client/stickerService";
import { Connected } from "../../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "../../lib/appStore";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const styles = (theme: Theme) =>
  createStyles
    ({
      root: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        minWidth: "20vh",
        minHeight: "35vh",
        maxWidth: "20vh",
        maxHeight: "35vh",
        marginRight: 10,
        backgroundColor: theme.palette.primary.main,
        marginTop: 20
      },
      media: {
        width: 128,
        height: 128,
        margin: "auto",
        marginTop: 10,
        borderColor: theme.palette.secondary.main,
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: "30%",
      },
      description: {
        color: theme.palette.secondary.main,
        fontSize: 16,
        minHeight: "6vh"
      },
      price: {
        float: "right",
        color: theme.palette.secondary.main,
        fontSize: 16
      },
      icon:
      {
        color: theme.palette.secondary.main,
        margin: 2,
        borderColor: theme.palette.secondary.main,
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: "50%",
        width: "2rem",
        height: "2rem",
        padding: 3
      }
    });

interface IState { }

interface IProps {
  sticker: StickerEntity;
}

class Sticker extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
  constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>) {
    super(props);
  }

  onClickHandler = async (): Promise<void> => {
    const data: StickerEntity = this.props.sticker;

    this.store.update({
      selectedSticker: data
    });
    this.store.state.cart.add(data);
  }

  render() {
    const css = this.props.classes;

    const Body = () =>
      <Card className={css.root}>
        <CardActionArea>
          <CardMedia
            className={css.media}
            image={this.props.sticker.URL}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className={css.description}>
              {this.props.sticker.Description}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className={css.price}>
              {this.props.sticker.Price} Ft
              </Typography>
            <AddShoppingCartIcon fontSize="small" className={css.icon} onClick={this.onClickHandler} />
          </CardContent>
        </CardActionArea>
      </Card>
    return Body();
  }
}

const StickerComponent = withRoot(withStyles(styles)(Sticker));
export default StickerComponent;