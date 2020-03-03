import * as React from "react";
import { Theme, createStyles, withStyles, WithStyles, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core"
import withRoot from "./../withRoot";
import { StickerEntity } from "../services/client/stickerService";
import { Connected } from "./../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "./../lib/appStore";
import { Routes } from "./../routing/urls";
import { cs } from "date-fns/locale";

const styles = (theme: Theme) =>
  createStyles
  ({
    
    root: {
      display:"flex",
      flexGrow:1,
      flexDirection:"row",
      maxWidth:"300px",
      margin:20,
      backgroundColor:theme.palette.secondary.main,
     
    },
    media: {
      width:300,
      height:300,
      
    },
    typography:{
      color:theme.palette.primary.main
    },
    price:{
      float:"right",
      color:theme.palette.primary.main
    }
  });

interface IState
{}

interface IProps
{
    sticker: StickerEntity;
}

class Sticker extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
  constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>)
  {
    super(props);
  }

  onClickHandler = async (): Promise<void> =>
  {
    const data: StickerEntity = this.props.sticker;

    this.store.update ({
      selectedSticker: data
    });

    //this.props.history.push(Routes.Details);
  }

  render()
  {
      const css = this.props.classes;

      const Body = () =>
    
          <Card className={css.root}>
          <CardActionArea>
            <CardMedia
              className={css.media}
              image={this.props.sticker.URL}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2"  className={css.typography}>
                {this.props.sticker.Description}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2" className={css.price}>
                {this.props.sticker.Price} Ft
              </Typography>
            </CardContent>
          </CardActionArea>
           <CardActions>
         
            <Button>
              Kosárba
            </Button>
          
        </CardActions>
        </Card>
   

      return Body();
  }
}

const StickerComponent = withRoot(withStyles(styles)(Sticker));
export default StickerComponent;