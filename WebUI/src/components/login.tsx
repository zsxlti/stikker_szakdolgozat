import * as React from "react";
import { Connected } from "./../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "./../lib/appStore";
import { StorageService } from "./../services/client/storage.service";
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, FormControlLabel, Checkbox, Button, Grid, Link, CssBaseline, Paper } from "@material-ui/core"
import withRoot from "./../withRoot";
import { CustomColors } from "./../style/colors";
import { LocalImages } from "./../staticFiles/images";
import { StorageKeys } from "./../settings/constans";
import { LoginRequest } from "./../services/client/securityService";
import { WebAPI } from "./../services/webAPI";
import { Validation } from "./../validators";
import FooterComponent from "./../pages/footer/footer";
import 'typeface-roboto';
import { Routes } from "./../routing/urls";



const styles = (theme: Theme) =>
  createStyles
    ({
      root:
      {
        display: "flex",
        '& > *': {
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
      loginContainer:
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
      minHeight: 215,
      margin: 10,
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
        alignItems:"center",
        justifyContent:"center",
      },
      textField:
      {
        borderWidth:2,
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
      link:{
        color:CustomColors.purple,
        fontSize:"16px"
       }
    });
interface IState {
  email: string;
  password: string;
}

interface IProps { }

class Login extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
{
  storageService: StorageService = new StorageService();

  constructor(props: IProps & WithStyles<typeof styles> & RouteComponentProps<{}>) {
    super(props);

    this.state =
    {
      email: "",
      password: ""
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
    return this.state.email.length > 0 && this.state.password.length > 0 && Validation.IsEmail(this.state.email)

  }

  onTextChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.setState
      ({
        [e.target.name]: e.target.value
      });
  }

  onLoginClickHandler = async (): Promise<void> => {
    const data: LoginRequest =
    {
      email: this.state.email,
      password: this.state.password
    };
    const token = await WebAPI.Security.login(data).then(x => x.Token)
      .catch();
    if (!token) {
      return;
    }
    const storage: StorageService = new StorageService();
    storage.write(StorageKeys.JWT, token);
    this.props.history.push(Routes.Home);
    //TODO: navigate to  page
  }
  render() {
    const css = this.props.classes;

    const loginButton = this.isFormFilled() ?
      <Button variant="contained" color="primary" type="submit" className={css.submit} onClick={this.onLoginClickHandler}>
        Bejelentkezés
      </Button> :
      <Button variant="contained" disabled className={css.submit}>
        Bejelentkezés
      </Button>

    const Body = () =>
    <React.Fragment>
      <CssBaseline/>
      <div className={css.root}>
        <Paper>
          <div className={css.logoContainer}>
            <img src={LocalImages.images('./stikker.png')} />
          </div>
          <form className={css.loginContainer}>
            <Typography className={css.typography} component="h1" variant="h5" gutterBottom>Bejelentkezés</Typography>
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
                id="email"
                label="E-mail cím"
                name="email"
                autoComplete="email"
                autoFocus
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
                className={css.textField}
                onChange={this.onTextChanged} />

              <FormControlLabel className={css.inputColor}
                control={<Checkbox value="remember" />}
                label="Emlékezz rám"
              />
              {loginButton}
              <Grid container className={css.grid}>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Elfelejtett jelszó
              </Link>
                </Grid>
                <Grid item>
                  <Link className={css.link} href=""/*{Routes.Home}*/ variant="body2">
                    {"Még nem regisztrált?"}
                  </Link>
                </Grid>
              </Grid>
            </div>
          </form>
          <div className={css.bottom}>
          <FooterComponent />
          </div>
        </Paper>
      </div>
      </React.Fragment>
    return Body();
  }
}

const LoginComponent = withRoot(withStyles(styles)(Login));
export default LoginComponent;