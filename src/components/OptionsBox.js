import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import { makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import IconButton from '@material-ui/core/IconButton';
import '../styles/OptionsBox.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import Button from '@material-ui/core/Button';
import {addPlayer} from '../redux/actions/addPlayer.action';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {generateTeams} from '../redux/actions/generateTeams.action';

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
  }));


const OptionsBox = ({addPlayer, players, generateTeams}) => {
    const classes = useStyles()

    const [name, setName] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)
    const [teamsNumber, setTeamsNumber] = useState(2) 

    const handleAddPlayer = () => {
        if (players.filter(player => player.name.toLowerCase().trim() === name.toLowerCase().trim()).length === 0) {
        addPlayer(name)
        setName("")
        } else {
            setErrorMessage(true)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }
        setErrorMessage(false)
      }

    const handleEnterKeyPressed = e => {
        const code = e.keyCode || e.which;
        if (code === 13 && name !== "") {
            handleAddPlayer()
        }
    }

    const handleGenerateTeams = () => {
        const arr1 = []
        const arr2 = []
        const arr3 = []
        const arr4 = []

        let playersArr = [...players]
        let i = 0

        while (i < playersArr.length) {
            let randomPlayer = playersArr[Math.floor(Math.random() * playersArr.length)]
            arr1.push(randomPlayer)
            playersArr = playersArr.filter(player => player.id !== randomPlayer.id)
            if (playersArr.length === 0) {break}

            randomPlayer = playersArr[Math.floor(Math.random() * playersArr.length)]
            arr2.push(randomPlayer)
            playersArr = playersArr.filter(player => player.id !== randomPlayer.id)
            if (playersArr.length === 0) {break}

            if (teamsNumber >= 3) {
                randomPlayer = playersArr[Math.floor(Math.random() * playersArr.length)]
                arr3.push(randomPlayer)
                playersArr = playersArr.filter(player => player.id !== randomPlayer.id)
                if (playersArr.length === 0) {break}
            }
            if (teamsNumber === 4) {
                randomPlayer = playersArr[Math.floor(Math.random() * playersArr.length)]
                arr4.push(randomPlayer)
                playersArr = playersArr.filter(player => player.id !== randomPlayer.id)
                if (playersArr.length === 0) {break}
            }
        }
        const teamsArr = [arr1, arr2]
        if (teamsNumber >= 3) {teamsArr.push(arr3)}
        if (teamsNumber === 4) {teamsArr.push(arr4)}

        generateTeams(teamsArr)

        
    }


    return (
        <>
        <Snackbar
         open={errorMessage}
         anchorOrigin={{horizontal: "center", vertical: "top"}}
         onClose={handleClose}
         autoHideDuration={3000}
         >
            <MuiAlert 
            severity="error"
            elevation={6} 
            variant="filled"
            onClose={handleClose}
            >Player's name should be unique!</MuiAlert>
        </Snackbar>
        <Paper elevation={3}>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item container xs={12} spacing={1} alignItems="baseline">
                        <Grid item xs={9} md={10}>
                            <TextField
                            className={classes.input}
                            color="primary"
                            label="Player's name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyPress={handleEnterKeyPressed}
                            />
                        </Grid>
                        <Grid item xs={3} md={2} style={{textAlign: "center"}}>
                            <IconButton 
                            className="addPlayerButton"
                            color="primary"
                            onClick={handleAddPlayer}
                            disabled={name === "" ? true : false}
                            >
                                <PersonAddRoundedIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={1}>
                        <Grid item xs={9} md={10}>
                            <FormControl className={classes.input}>
                                <InputLabel>Teams</InputLabel>
                                <Select
                                value={teamsNumber}
                                onChange={(e) => setTeamsNumber(e.target.value)}
                                >
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3} disabled={players.length > 4 ? false : true}>3</MenuItem>
                                    <MenuItem value={4} disabled={players.length > 6 ? false : true}>4</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} md={2} style={{textAlign: "center"}}>
                            <IconButton 
                            className="minusButton"
                            disabled={teamsNumber !== 2 ? false : true}
                            onClick={() => setTeamsNumber(teamsNumber - 1)}
                            >
                                <RemoveRoundedIcon/>
                            </IconButton>
                            <IconButton 
                            className="plusButton"
                            disabled={(teamsNumber === 2 && players.length > 4) || (teamsNumber === 3 && players.length > 6) ? false : true}
                            onClick={() => setTeamsNumber(teamsNumber + 1)}
                            >
                                <AddRoundedIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                        className={classes.input}
                        variant="contained"
                        color="primary"
                        disabled={players.length >= 2 ? false : true}
                        onClick={handleGenerateTeams}
                        >
                            Generate
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Paper>
        </>
    )
}

const mapStateToProps = (state) => ({
    players: state.playersList
})

const mapDispatchToProps = {addPlayer, generateTeams}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsBox);