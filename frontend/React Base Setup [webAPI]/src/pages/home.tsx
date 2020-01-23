import * as React from "react";
import { Connected } from "./../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { IAppState } from "./../lib/appState.store";
import { AppStore } from "./../lib/appStore";
import { WebAPI } from "./../services/webAPI";
import { LoginRequest } from "../services/client/securityService";
import { StorageService } from "./../services/client/storage.service";
import { StorageKeys } from "./..//settings/constats";
import { DiakEntity, RequestDiakByName } from "./../services/client/diakService";
import { UserResponse } from "../services/client/userService";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core"
import withRoot from "./../withRoot";
import { async } from "q";
import DiakComponent from "./diak.component";

const styles = (theme: Theme) =>
  createStyles
  ({
    contaier:
    {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      backgroundColor: "#000D31",
      color: "#ABAEB6"
    },
    buttonContainer:
    {
      display: "flex",
      justifyContent: "space-evenly",
      alignContent: "center",
      padding: 50
    },
    button:
    {
      backgroundColor: "#0F37A1",
      padding: 30,
      color: "#ABAEB6",
      borderRadius: 20
    },
    user:
    {},
    diak:
    {}
  });

interface IState
{
  appState: IAppState;
  user: UserResponse;
  diakok: DiakEntity[];
  token: string | undefined;
}

interface IProps
{
  message: string;
}

class Home extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
    storageService: StorageService = new StorageService();

    constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>)
    {
        super(props);

        this.state =
        {
          appState: this.store.state,
          user: {},
          diakok: [],
          token: undefined
        }
    }

    login = async (): Promise<void> =>
    {
    const loginData : LoginRequest =
    {
      Email: "wasyster@gmail.com",
      Jelszo: "password"
    };

      let token: string | undefined = await WebAPI.Security.login(loginData).then(x => x.Token);

      this.setState
      ({
        ...this.state,
        token
      });

      this.storageService.write(StorageKeys.JWT, token);
    }

    getUserData = async (): Promise<void> =>
    {
      let whoAmI: UserResponse = await WebAPI.User.getUser().then(x => x);

      this.setState
      ({
        ...this.state,
        user: whoAmI
      })
    }

    getDiakok = async (): Promise<void> =>
    {
      const requestParam: RequestDiakByName =
      {
        Name: "Harmadik Huba"
      };

      let data: DiakEntity[] = await WebAPI.Diak.all().then(x => x);

      this.setState
      ({
        ...this.state,
        diakok: data
      })
    }

    logout = async (): Promise<void> =>
    {
      this.storageService.remove(StorageKeys.JWT);

      this.setState
      ({
        ...this.state,
        user: {},
        diak: {}
      })
    }

    render()
    {

      const css = this.props.classes;

      const diakokList:JSX.Element[] = this.state.diakok.map
      (
          x =>
          (
              <DiakComponent diak={x} />
          )
      );

      const Body = () =>
        <div className={css.contaier}>
          <div className={css.buttonContainer}>
            <button className={css.button} onClick={this.login}>LOGIN</button>
            <button className={css.button} onClick={this.getUserData}>"Who Am I"</button>
            <button className={css.button} onClick={this.getDiakok}>Diak</button>
            <button className={css.button} onClick={this.logout}>LOGOUT</button>
           </div>
           <div className={css.user}>
            <h1>User:</h1>
            <p>UNIQ: {this.state.user.UniqID}</p>
            <p>MAIL: {this.state.user.Email}></p>
            <p>ROLE: {this.state.user.Role}</p>
           </div>
           <div className={css.diak}>
            <h1>DIAKOK</h1>
            {diakokList}
           </div>
         </div>
      return Body();
  }
}

const HomePage = withRoot(withStyles(styles)(Home));
export default HomePage;