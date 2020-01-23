import * as React from "react";
import { Connected } from "./../lib/store/connected.mixin";
import { RouteComponentProps } from "react-router";
import { AppStore } from "./../lib/appStore";
import { StorageService } from "./../services/client/storage.service";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core"
import withRoot from "./../withRoot";
import { DiakEntity } from "./../services/client/diakService";

const styles = (theme: Theme) =>
  createStyles
  ({
    root:
    {
        borderBottom:'3px solid white'
    }    
  });

  

interface IState
{
  
}

interface IProps
{
    diak: DiakEntity;
}

class Diak extends Connected<typeof React.Component, IProps & WithStyles<typeof styles> , IState, AppStore>(React.Component)
{
    storageService: StorageService = new StorageService();

    constructor(props: IProps & WithStyles<typeof styles>)
    {
        super(props);

        this.state =
        {
          
        }
    }

    render()
    {
        const css=this.props.classes;

        
        const Body = () => 
        <div className={css.root}>
        <React.Fragment key={this.props.diak.Id}>
            <h3>Diak:</h3>
            <p>ID: {this.props.diak.Id}</p>
            <p>UniqID: {this.props.diak.UniqID}></p>
            <p>NEV: {this.props.diak.Nev}</p>
            <p>KREDITEK: {this.props.diak.Kreditek}</p>
      </React.Fragment>
      </div>
        return Body();
    }
}


const DiakComponent = withRoot(withStyles(styles)(Diak));
export default DiakComponent;