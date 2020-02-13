import * as React from "react";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import withRoot from "./../../withRoot";
import { CustomColors } from "./../../style/colors";
import 'typeface-roboto';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = (theme: Theme) =>
    createStyles
        ({
            container:
            {
                display: "flex",
                flexGrow: 1,
            },
            appbar:{
                backgroundColor:CustomColors.purple+ "!important",
            },
            title: {
                flexGrow: 1,
                backgroundColor:CustomColors.purple,
                color:CustomColors.gold,
                fontStyle:"Roboto !important"
            },
            button:{
                color:CustomColors.gold,
            }
        });

interface IState {
}

interface IProps { }

class Header extends React.Component<IProps & WithStyles<typeof styles>, IState>
{
    render() {
        const css = this.props.classes;
        const Body = () =>
            <div className={css.container}>
                <AppBar position="static" className={css.appbar}>
                    <Toolbar>
                        <Typography variant="h6" className={css.title}>
                            Matricák
                        </Typography>
                        <Button className={css.button}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
        return Body();
    }
}

const HeaderComponent = withRoot(withStyles(styles)(Header));
export default HeaderComponent;