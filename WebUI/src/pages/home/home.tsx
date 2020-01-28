import * as React from "react";
import { Connected } from "../../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "../../lib/appStore";
import { StorageService } from "../../services/client/storage.service";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core"
import withRoot from "../../withRoot";

const styles = (theme: Theme) =>
  createStyles
  ({
    container:
    {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      backgroundColor: "#000D31",
      color: "#ABAEB6"
    }
  });

interface IState
{
  email: string;
  password: string;
}

interface IProps
{}

class Home extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
    storageService: StorageService = new StorageService();

    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>)
    {
        super(props);

        this.state =
        {
          email: "",
          password:""
        }
    }

    render()
    {
      const css = this.props.classes;

      const Body = () =>
        <div className={css.container}>
          HOME PAGE
         </div>
      return Body();
  }
}

const HomePage = withRoot(withStyles(styles)(Home));
export default HomePage;