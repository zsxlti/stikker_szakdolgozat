import * as React from "react";
import { Connected } from "../../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "../../lib/appStore";
import { StorageService } from "../../services/client/storage.service";
import { Theme, createStyles, withStyles, WithStyles, TextField, Typography, FormControlLabel, Checkbox, Button, Grid, Link, CssBaseline } from "@material-ui/core"
import withRoot from "../../withRoot";
import { CustomColors } from "./../../style/colors";
import { LocalImages } from "./../../staticFiles/images";
import 'typeface-roboto';

const styles = (theme: Theme) =>
  createStyles
    ({
      container:
      {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: CustomColors.white,
        color: CustomColors.purple,

      },
      /* content:
       {
         display: "flex",
         flexGrow: 1,
         flexDirection: "column",
         fontFamily: "Roboto"
       },*/
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
        fontFamily: "Roboto sans-serif",
        color: CustomColors.gold + "!important",
        margin: "auto"
      },
      typography:
      {
        color: CustomColors.purple + "!important",
        fontSize: "30px",
        fontFamily: "Roboto",
      },
      textField:
      {
        borderColor: CustomColors.gold + "!important",
        fontFamily: "Roboto",

      },
      inputColor: {
        color: CustomColors.purple + "!important",
        fontFamily: "Roboto",

      },
      submit: {
        backgroundColor: CustomColors.purple,
        color: CustomColors.gold,
        fontFamily: "Roboto",
      },

    });

interface IState {
  email: string;
  password: string;
}

interface IProps { }

class Home extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> & RouteComponentProps<{}>, IState, AppStore>(React.Component)
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

  render() {
    const css = this.props.classes;

    const Body = () =>
      <div className={css.container}>
        <div className={css.logoContainer}>
          <img src={LocalImages.images('./stikker.png')} />
        </div>
        <div className={css.loginContainer}>
          <Typography className={css.typography} component="h1" variant="h5" gutterBottom>Bejelentkezés</Typography>
          <TextField InputProps={{
            classes: {
              notchedOutline: css.textField,
              input: css.inputColor
            }
          }
          }
            variant="outlined"
            margin="normal"
            required

            id="email"
            label="E-mail cím"
            name="email"
            autoComplete="email"
            autoFocus
            className={css.textField}
             /* onChange={this.onTextChanged}*/ />
          <TextField InputProps={{
            classes: {
              notchedOutline: css.textField,
              input: css.inputColor
            }
          }
          }
            variant="outlined"
            margin="normal"
            required

            id="password"
            label="Jelszó"
            name="password"
            autoComplete="password"
            autoFocus
            type="password"
            className={css.textField}
             /* onChange={this.onTextChanged}*/ />

          <FormControlLabel className={css.inputColor}
            control={<Checkbox value="remember" />}
            label="Emlékezz rám"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={css.submit}
          >
            Bejelentkezés
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Elfelejtett jelszó
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    return Body();
  }
}

const HomePage = withRoot(withStyles(styles)(Home));
export default HomePage;