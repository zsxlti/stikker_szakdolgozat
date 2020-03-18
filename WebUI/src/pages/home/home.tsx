import * as React from "react";
import { Connected } from "../../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "../../lib/appStore";
import { StorageService } from "../../services/client/storage.service";
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, FormControlLabel, Checkbox, Button, Grid, Link, CssBaseline, Paper } from "@material-ui/core"
import withRoot from "../../withRoot";
import { LocalImages } from "./../../staticFiles/images";
import { StorageKeys } from "./../../settings/constans";
import FooterComponent from "../footer/footer";
import LoginComponent from "./../../components/login";
import RegisterComponent from "./../../components/register";
import { Urls } from "./../../routing/urls";

const styles = (theme: Theme) =>
  createStyles
    ({
      container:
      {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
        justifyContent: "center",
        minHeight: "100vh"
      },
      logoContainer:
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30px",
      },
      statusText: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        color: theme.palette.primary.main,
        justifyContent: "center",
      },
    });

interface IState {
  name: string;
  email: string;
  password: string;
  birthday: Date;
  statusText: string;
  isRegistered: boolean;
}

interface IProps { }

class Home extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
  storageService: StorageService = new StorageService();

  constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>) {
    super(props);

    this.state =
    {
      name: "",
      email: "",
      password: "",
      birthday: new Date(),
      statusText: "Van már fiókja?",
      isRegistered: true
    }
  }

  componentWillMount() {
    const storage: StorageService = new StorageService();

    const token: string | undefined = storage.read<string>(StorageKeys.JWT);

    if (token) {
      this.props.history.push(Urls.stickers)
    }
  }

  onClickHandler = () => {
    this.setState({
      ...this.state,
      isRegistered: !this.state.isRegistered,
      statusText: this.state.isRegistered ? "Még nem regisztrált?" : "Van már fiókja?"
    })
  }

  render() {
    const css = this.props.classes;
    const form: JSX.Element = this.state.isRegistered ?
      <RegisterComponent{...this.props} /> :
      <LoginComponent{...this.props} />
    const Body = () =>
        <React.Fragment>
        <div className={css.container}>
          <div className={css.logoContainer}>
            <img src={LocalImages.images("./stikker.png")} />
          </div>
          {form}
          <div className={css.statusText} onClick={this.onClickHandler}>
            {this.state.statusText}
          </div>
        </div>
        <FooterComponent />
      </React.Fragment>
    return Body();
  }
}

const HomePage = withRoot(withStyles(styles)(Home));
export default HomePage;