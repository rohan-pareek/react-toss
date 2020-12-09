import React, { useEffect } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import Players from './Players';
import PreviousTeams from './PinnedTeams';
import { connect } from 'react-redux';
import { logout } from '../actions/group';
import Team from './Team';

function Dashboard(props) {

    useEffect(() => {
        if (!localStorage.getItem('groupID')) {
            props.history.push('/')
        }
    }, [props.history])

    const goHome = () => {
        props.logout();
        props.history.push('..');
    }

    return (
        <div className="dashboard">
            <div className="dashoard-title">
                <span onClick = {goHome} style = {{cursor: "pointer"}}>Home</span>
                <span>Group ID: {props.groupID}</span>
            </div>
            <div className="dashboard-links">
                <NavLink to="/dashboard/players">Players</NavLink>
                <NavLink to="/dashboard/teams">Teams</NavLink>
                <NavLink to="/dashboard/previousteams">Pinned Teams</NavLink>
            </div>

            <div className="dashboard-content">
                <Switch>
                    <Route exact path="/dashboard">
                        <Redirect to="/dashboard/players" />
                    </Route>
                    <Route path="/dashboard/players" component={Players} />
                    <Route path="/dashboard/teams" component={Team} />
                    <Route path="/dashboard/previousteams" component={PreviousTeams} />
                </Switch>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    groupID: state.group.groupID,
    isLoggedIn: state.group.isLoggedIn,
})

export default connect(mapStateToProps, { logout })(Dashboard);
