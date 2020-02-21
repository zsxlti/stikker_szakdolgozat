import * as React from "react";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core"
import withRoot from "./../withRoot";
import { StickerEntity } from "../services/client/stickerService";
import { Connected } from "./../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "./../lib/appStore";
import { Routes } from "./../routing/urls";

const styles = (theme: Theme) =>
  createStyles
  ({
    container:
    {
      display: "flex",
      flexGrow: 1
    },
    card:
    {
        width: 300,
        height: 450,
        backgroundColor: "#121212",
        display: "block",
        marginTop: 15,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        borderRadius: 20,
        boxShadow: "5px 5px 20px #33ff00"
    },
    kep:
    {
        width: 300,
        height: 230,
        borderRadius: 20,
        border: "10px solid #121212"
    },
    cardContainer:
    {
        width: 300,
        maxHeight: 800,
        backgroundColor: "#121212"
    },
    cim:
    {
        marginLeft: 10,
        color: "#33ff00"
    },
    cardText:
    {
        display: "block",
        width: "100%",
        height: "100%",
        marginTop: 25,
        marginBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        color: "#5cff33",
        wordBreak: "break-all"
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

    /*this.store.update ({
      selectedBicycle: data
    });

    this.props.history.push(Routes.Details);*/
  }

  render()
  {
      const css = this.props.classes;

      const Body = () =>
          <div className={css.card} onClick={this.onClickHandler}>
              <img src={this.props.sticker.URL} className={css.kep} />
              <div className={css.cardContainer}>
                  <h2 className={css.cim}>{this.props.sticker.Offered}</h2>
                  <h3 className={css.cim}>{this.props.sticker.Description}</h3>
              </div>
          </div>

      return Body();
  }
}

const StickerComponent = withRoot(withStyles(styles)(Sticker));
export default StickerComponent;