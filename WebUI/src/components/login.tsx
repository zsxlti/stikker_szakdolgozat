import * as React from "react";
import { Connected } from "./../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "./../lib/appStore";
import { StorageService } from "./../services/client/storage.service";
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, FormControlLabel, Checkbox, Button, Grid, Link, CssBaseline, Paper } from "@material-ui/core"
import withRoot from "./../withRoot";
import { StorageKeys } from "./../settings/constans";
import { LoginRequest } from "./../services/client/securityService";
import { WebAPI } from "./../services/webAPI";
import { Validation } from "./../validators";
import 'typeface-roboto';



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
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.main,
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
        color: theme.palette.primary.main + "!important",
        margin: "auto"
      },
      bottom:
      {
        minHeight: 215,
        margin: 10,
        fontSize: 50,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      typography:
      {
        color: theme.palette.primary.main + "!important",
        fontSize: "30px",
        fontFamily: "Roboto",
        alignItems: "center",
        justifyContent: "center",
      },
      textField:
      {
        borderWidth: 2,
        borderColor: theme.palette.primary.main + "!important",
        fontFamily: "Roboto",
        width: "100%"
      },
      inputColor: {
        color: theme.palette.primary.main + "!important",
        fontFamily: "Roboto",
      },
      submit: {
        backgroundColor: theme.palette.primary.main + "!important",
        color: theme.palette.secondary.main,
        fontFamily: "Roboto",
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px"
      },
      grid: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        color: theme.palette.primary.main,
        fontFamily: "Roboto",
        alignContent: "left"
      },

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
      password: "",
    }
  }

  componentWillMount() {
    const storage: StorageService = new StorageService();

    const token: string | undefined = storage.read<string>(StorageKeys.JWT);

    if (token) {
      //TODO: navigate to home page
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
    const token = await WebAPI.Security.login(data)
      .then(x => x)
      .catch();
    if (token) {
      WebAPI.setToken(token.Token!)
      //TODO: navigate to..
    }

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
        <CssBaseline />
        <div className={css.root}>
          <div className={css.loginContainer}>
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
                type="password"
                className={css.textField}
                onChange={this.onTextChanged} />
              <FormControlLabel className={css.inputColor}
                control={<Checkbox value="remember" />}
                label="Emlékezz rám"
              />
            </div>
            {loginButton}
            <div className={css.grid}>
              Elfelejtett jelszó
            </div>
          </div>
        </div>
      </React.Fragment>
    return Body();
  }
}

const LoginComponent = withRoot(withStyles(styles)(Login));
export default LoginComponent;