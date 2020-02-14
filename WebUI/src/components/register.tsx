import * as React from "react";
import { Connected } from "./../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "./../lib/appStore";
import { StorageService } from "./../services/client/storage.service";
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, FormControlLabel, Checkbox, Button, Grid, Link, CssBaseline, Paper } from "@material-ui/core"
import withRoot from "./../withRoot";
import { CustomColors } from "./../style/colors";
import { StorageKeys } from "./../settings/constans";
import { RegisterRequest, TokenResponse } from "./../services/client/securityService";
import { WebAPI } from "./../services/webAPI";
import { Validation } from "./../validators";
import "typeface-roboto";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
      datePicker:
      {
        padding:"10px",
        fontSize: "20px",
        color: CustomColors.purple,
        backgroundColor: CustomColors.gold,
        border:"2px solid"
      }
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
      statusText: "Van már fiókja?",
      isRegistered: true
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
    const token = await WebAPI.Security.register(data).then(x => x.Token)
      .catch();
    if (!token) {
      return;
    }
    const storage: StorageService = new StorageService();
    storage.write(StorageKeys.JWT, token);
  }

  changeHandler = async (date: Date, event: React.SyntheticEvent<any, Event>): Promise<void> => {
    await this.setState
      ({
        ...this.state,
        birthday: date
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
                type="password"
                required
                className={css.textField}
                onChange={this.onTextChanged} />
              <DatePicker
                className={css.datePicker}
                todayButton={'Today'}
                selected={this.state.birthday}
                onChange={this.changeHandler}
                name="birthdayComponent"
                required
                minDate={new Date(0, 0, 0, 0, 0, 0, 0)}
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