import * as React from "react";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import withRoot from "../../withRoot";
import "typeface-roboto";

const styles = (theme: Theme) =>
  createStyles
    ({
      container:
      {
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.secondary.main,
        minHeight: 50,
        fontFamily: "Roboto",
        fontSize: "20px",
        width: "100%",
        backgroundColor: theme.palette.primary.main
      },
    });

interface IState {
}

interface IProps { }

class Footer extends React.Component<IProps & WithStyles<typeof styles>, IState>
{
  render() {
    const css = this.props.classes;
    const Body = () =>
      <div className={css.container}>
        Copyright © Stikker 2020.
      </div>
    return Body();
  }
}

const FooterComponent = withRoot(withStyles(styles)(Footer));
export default FooterComponent;