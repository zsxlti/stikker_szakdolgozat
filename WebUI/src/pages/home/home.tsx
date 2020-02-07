import * as React from "react";
import { Connected } from "../../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "../../lib/appStore";
import { StorageService } from "../../services/client/storage.service";
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, FormControlLabel, Checkbox, Button, Grid, Link, CssBaseline, Paper } from "@material-ui/core"
import withRoot from "../../withRoot";
import { CustomColors } from "./../../style/colors";
import { LocalImages } from "./../../staticFiles/images";
import { StorageKeys } from "./../../settings/constans";
import { RegisterRequest, TokenResponse } from "./../../services/client/securityService";
import { WebAPI } from "./../../services/webAPI";
import { Validation } from "./../../validators";
import FooterComponent from "../footer/footer";
import "typeface-roboto";
import { Enumerable } from "linq-es5/lib/enumerable";
import { Routes } from "./../../routing/urls";
import LoginComponent from "src/components/login";

const styles = (theme: Theme) =>
  createStyles
    ({
      root:
      {
        display: "flex",
        "& > *": {
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: CustomColors.gold,
          color: CustomColors.purple,
          justifyContent: "center",
        }
      },
      logoContainer:
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30px",
      },
      registerContainer:
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: "40%",
        fontFamily: "Roboto",
        color: CustomColors.purple + "!important",
        margin: "auto"
      },
      bottom:
      {
        minHeight: 100,
        padding: 10,
        fontSize: 50,
        color: CustomColors.purple,
        backgroundColor: CustomColors.gold,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      typography:
      {
        color: CustomColors.purple + "!important",
        fontSize: "30px",
        fontFamily: "Roboto",
        alignItems: "center",
        justifyContent: "center",
      },
      textField:
      {
        borderWidth: 2,
        borderColor: CustomColors.purple + "!important",
        fontFamily: "Roboto",
        width: "100%"
      },
      inputColor: {
        color: CustomColors.purple + "!important",
        fontFamily: "Roboto",
      },
      submit: {
        backgroundColor: CustomColors.purple + "!important",
        color: CustomColors.gold,
        fontFamily: "Roboto",
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px"
      },
      grid: {
        color: CustomColors.purple,
        fontFamily: "Roboto",
      },
      link: {
        color: CustomColors.purple + "!important",
        fontSize: "16px",
      }
    });

interface IState {
  //name : "login" | "register";
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
      isRegistered : true
    }
  }

  componentWillMount() {
    const storage: StorageService = new StorageService();

    const token: string | undefined = storage.read<string>(StorageKeys.JWT);

    if (token) {
      //TODO: navigate to  page
    }
  }



  isFormFilled = (): boolean => {
    return this.state.email.length > 0 && this.state.password.length > 0 && Validation.IsEmail(this.state.email) && this.state.name.length > 0
  }

  onTextChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.setState
      ({
        [e.target.name]: e.target.value
      });
  }

  onClickHandler = async (): Promise<void> => {
    const data: RegisterRequest =
    {
      Email: this.state.email,
      Password: this.state.password,
      Name: this.state.name,
      BirthDate: this.state.birthday
    };

    console.log(data);
    const token = await WebAPI.Security.login(data).then(x => x.Token)
      .catch();
    if (!token) {
      return;
    }
    const storage: StorageService = new StorageService();
    storage.write(StorageKeys.JWT, token);
  }
  LoginNavigate = () => {
    this.setState({
      ...this.state,
      isRegistered : !this.state.isRegistered,
      statusText :this.state.isRegistered ? "Van már fiókja?" : "Jelentkezzen be"
    })
  }
  render() {
    const css = this.props.classes;
    const registerButton = this.isFormFilled() ?
      <Button variant="contained" color="primary" type="submit" className={css.submit} onClick={this.onClickHandler}>
        Regisztráció
      </Button> :
      <Button variant="contained" disabled className={css.submit}>
        Regisztráció
      </Button>

      const form: JSX.Element = this.state.isRegistered ?
                                <LoginComponent /> :
                                <RegisterComponent />

    const Body = () =>
      <React.Fragment>
        <CssBaseline />
        <div className={css.root}>
          <Paper>
            <div className={css.logoContainer}>
              <img src={LocalImages.images("./stikker.png")} />
            </div>
            {form}
            <div className={css.registerContainer}>
              <Typography className={css.typography} component="h1" variant="h5" gutterBottom>Regisztráció</Typography>
              <div>
                <TextField InputProps={{
                  classes: {
                    notchedOutline: css.textField,
                    input: css.inputColor
                  }
                }
                }
                  variant="outlined"
                  margin="normal"
                  id="name"
                  label="Név"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  required
                  className={css.textField}
                  onChange={this.onTextChanged} />
                <TextField InputProps={{
                  classes: {
                    notchedOutline: css.textField,
                    input: css.inputColor
                  }
                }
                }
                  variant="outlined"
                  margin="normal"
                  id="email"
                  label="E-mail cím"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  required
                  className={css.textField}
                  onChange={this.onTextChanged} />
                <TextField InputProps={{
                  classes: {
                    notchedOutline: css.textField,
                    input: css.inputColor
                  }
                }
                }
                  variant="outlined"
                  margin="normal"
                  id="password"
                  label="Jelszó"
                  name="password"
                  autoComplete="password"
                  autoFocus
                  type="password"
                  required
                  className={css.textField}
                  onChange={this.onTextChanged} />
                <TextField InputProps={{
                  classes: {
                    notchedOutline: css.textField,
                    input: css.inputColor
                  }
                }
                }
                  id="date"
                  label="Születési dátum"
                  type="date"
                  variant="outlined"
                  margin="normal"
                  autoFocus
                  required
                  className={css.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {registerButton}
                <Grid container className={css.grid}>
                  <Grid item xs>
                    <p onClick={this.LoginNavigate}>
                      {this.state.statusText}
                     </p>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className={css.bottom}>
              <FooterComponent />
            </div>
          </Paper>
        </div>
      </React.Fragment>
    return Body();
  }
}

const HomePage = withRoot(withStyles(styles)(Home));
export default HomePage;