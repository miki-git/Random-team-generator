import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import '../styles/PlayersList.css';
import Chip from '@material-ui/core/Chip';
import {connect} from 'react-redux';
import Grow from '@material-ui/core/Grow';
import {removePlayer} from '../redux/actions/removePlayer.action';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    input: {
      width: "100%",
    },
    paper: {
        backgroundColor: "#eeeeee"
    },
    chip: {
        margin: theme.spacing(0.5)
    }
  }));


const PlayersList = ({players, removePlayer}) => {
    const classes = useStyles()
    return (
        <div>
        <Grow in={players.length > 0}>
        <Paper elevation={3}>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h3 className="playersLabel">Players ({players.length})</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {players.map(player => (
                                <Grow in={true}>
                                <Chip
                                    key={player.id}
                                    label={player.name}
                                    onDelete={() => removePlayer(player.id)}
                                    color="primary"
                                    className={classes.chip}
                                />
                                </Grow>
                            ))}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Paper>
        </Grow>
        </div>
    )
}

const mapStateToProps = (state) => ({
    players: state.playersList
})

const mapDispatchToProps = {removePlayer}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersList);