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
import { Routes, Urls } from "./../routing/urls";

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
        width: "100%",
        color: theme.palette.primary.main + "!important",
        margin: "auto",
        minHeight: "59vh"
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
        alignItems: "center",
        justifyContent: "center",
      },
      textField:
      {
        borderWidth: 2,
        borderColor: theme.palette.primary.main + "!important",
        width: "100%"
      },
      textFieldOutlinedInput:
      {
        "&$cssFocused $notchedOutline":
        {
          borderColor: `${theme.palette.primary.main} !important`,
        }
      },
      textFieldFocused:
      {
        color: theme.palette.primary.main
      },
      textFieldNotchedOutline:
      {
        borderWidth: "2px",
        borderColor: theme.palette.primary.main + "!important"
      },
      textFieldLabel:
      {
        color: `${theme.palette.primary.main} !important`,
      },
      inputColor: {
        color: theme.palette.primary.main + "!important",
      },
      submit: {
        backgroundColor: theme.palette.primary.main + "!important",
        color: theme.palette.secondary.main,
        minWidth: "60%",
        marginTop: "10px",
        marginBottom: "10px"
      },
      grid: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        color: theme.palette.primary.main,
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
      this.props.history.push(Urls.stickers);
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
      this.props.history.push(Urls.stickers);
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
              <TextField InputLabelProps={{
                classes: {
                  root: css.textFieldLabel,
                  focused: css.textFieldFocused
                }
              }}
                InputProps={{
                  classes: {
                    root: css.textFieldOutlinedInput,
                    focused: css.textFieldFocused,
                    notchedOutline: css.textFieldNotchedOutline,
                    input: css.textFieldFocused
                  },
                }}
                variant="outlined"
                margin="normal"
                id="email"
                label="E-mail cím"
                name="email"
                autoComplete="off"
                className={css.textField}
                onChange={this.onTextChanged} />
              <TextField InputLabelProps={{
                classes: {
                  root: css.textFieldLabel,
                  focused: css.textFieldFocused
                }
              }}
                InputProps={{
                  classes: {
                    root: css.textFieldOutlinedInput,
                    focused: css.textFieldFocused,
                    notchedOutline: css.textFieldNotchedOutline,
                    input: css.textFieldFocused
                  },
                }}
                variant="outlined"
                margin="normal"
                id="password"
                label="Jelszó"
                name="password"
                autoComplete="off"
                type="password"
                className={css.textField}
                onChange={this.onTextChanged} />
              {loginButton}
            </div>
          </div>
        </div>
      </React.Fragment>
    return Body();
  }
}

const LoginComponent = withRoot(withStyles(styles)(Login));
export default LoginComponent;