import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {generateTeams} from '../redux/actions/generateTeams.action';


const useStyles = makeStyles((theme) => ({
    table: {
        tableLayout: "fixed"
    }
  }));

const TeamsTable = ({teams, generateTeams}) => {
    const classes = useStyles()
    return (
        <Grow in={teams.length}>
            <TableContainer component={Paper}>
                <div className="closeTableContainer">
                    <CloseRoundedIcon
                    onClick={() => generateTeams([])}
                    />
                </div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {teams.map((team, i) => (
                                <TableCell key={i}>Team {i + 1}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {teams.length > 0 ? <TableBody>
                        {teams[0].map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {teams.map((player) => (
                                    <TableCell>{player[rowIndex] !== undefined ? player[rowIndex].name : null}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody> : null}
                </Table>
            </TableContainer>
        </Grow>
    )
}

const mapStateToProps = (state) => ({
    teams: state.teams
})

const mapDispatchToProps = {generateTeams}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsTable);