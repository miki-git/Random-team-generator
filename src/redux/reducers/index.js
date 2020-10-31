import {combineReducers} from 'redux';
import {playersList} from './playersList.reducer';
import {teams} from './teams.reducer'

export default combineReducers({
    playersList,
    teams
})