import React from 'react';
import OptionsBox from './OptionsBox';
import PlayersList from './PlayersList';
import TeamsTable from './TeamsTable';
import Grid from '@material-ui/core/Grid';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        /* flexGrow: 1, */
        margin: theme.spacing(2),
    },
  }));


const Main = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <OptionsBox/>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <PlayersList/>
                </Grid>
                <Grid item xs={12}>
                    <TeamsTable/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Main;