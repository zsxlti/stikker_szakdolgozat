import * as React from "react";
import { Connected } from "./../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "./../lib/appStore";
import { StorageService } from "./../services/client/storage.service";
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, FormControlLabel, Checkbox, Button, Grid, Link, CssBaseline, Paper } from "@material-ui/core"
import withRoot from "./../withRoot";
import { StorageKeys } from "./../settings/constans";
import { RegisterRequest, TokenResponse } from "./../services/client/securityService";
import { WebAPI } from "./../services/webAPI";
import { Validation } from "./../validators";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import hu from "date-fns/locale/hu";
registerLocale("hu", hu);
import { Urls } from "./../routing/urls";

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
      registerContainer:
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: "40%",
        color: theme.palette.primary.main + "!important",
        margin: "auto",
        minHeight: "59vh"
      },
      bottom:
      {
        minHeight: 100,
        padding: 10,
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
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px"
      },
      grid: {
        color: theme.palette.primary.main,
      },
      datePicker:
      {
        padding: "10px",
        fontSize: "20px",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        border: "2px solid",
        borderRadius: "5px",
        marginTop: "10px",
        marginBottom: "10px"
      }
    });

interface IState {
  name: string;
  email: string;
  password: string;
  birthday: Date;
  isRegistered: boolean;
}

interface IProps { }

class Register extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
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
      isRegistered: true
    }
  }

  componentWillMount() {
    const storage: StorageService = new StorageService();
    const token: string | undefined = storage.read<string>(StorageKeys.JWT);
  }

  isFormFilled = (): boolean => {
    return this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      Validation.IsEmail(this.state.email) &&
      this.state.name.length > 0 &&
      (this.state.birthday !== undefined || this.state.birthday !== null)
  }

  onTextChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.setState
      ({
        [e.target.name]: e.target.value
      });
  }

  onRegisterClickHandler = async (): Promise<void> => {
    const data: RegisterRequest =
    {
      Email: this.state.email,
      Password: this.state.password,
      Name: this.state.name,
      BirthDate: this.state.birthday
    };

    console.log(data);
    const token = await WebAPI.Security.register(data)
                                       .then(x => x.Token)
                                       .catch();
    
    const storage: StorageService = new StorageService();
    storage.write(StorageKeys.JWT, token);
    this.props.history.push(Urls.stickers);
  }

  changeHandler = async (date: Date, event: React.SyntheticEvent<any, Event>): Promise<void> => {
    var dob: Date =date;
    dob.setHours(2); 
    
    await this.setState
      ({
        ...this.state,
        birthday: dob
      });
  }

  render() {
    const css = this.props.classes;
    const registerButton = this.isFormFilled() ?
      <Button variant="contained" color="primary" type="submit" className={css.submit} onClick={this.onRegisterClickHandler}>
        Regisztráció
      </Button> :
      <Button variant="contained" disabled className={css.submit}>
        Regisztráció
      </Button>

    const Body = () =>
      <React.Fragment>
        <CssBaseline />
        <div className={css.root}>
          <div className={css.registerContainer}>
            <Typography className={css.typography} component="h1" variant="h5" gutterBottom>Regisztráció</Typography>
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
                autoComplete="off"
                variant="outlined"
                margin="normal"
                id="name"
                label="Név"
                name="name"
                required
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
                autoComplete="off"
                variant="outlined"
                margin="normal"
                id="email"
                label="E-mail cím"
                name="email"
                required
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
                autoComplete="off"
                variant="outlined"
                margin="normal"
                id="password"
                label="Jelszó"
                name="password"
                type="password"
                required
                className={css.textField}
                onChange={this.onTextChanged} />
              <DatePicker
                className={css.datePicker}
                dateFormat="yyyy/MM/dd"
                selected={this.state.birthday}
                onChange={this.changeHandler}
                locale="hu"
                placeholderText="Születési dátum megadása"
                name="birthdayComponent"
              />
              {registerButton}
            </div>
          </div>
        </div>
      </React.Fragment>
    return Body();
  }
}

const RegisterComponent = withRoot(withStyles(styles)(Register));
export default RegisterComponent;