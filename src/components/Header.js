import React from 'react';
import '../styles/Header.css';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';


const Header = () => {
    return (
        <div className="appHeader">
            <h1>
                <GroupRoundedIcon fontSize="inherit"/>
                Team generator
            </h1>
        </div>
    )
}

export default Header;