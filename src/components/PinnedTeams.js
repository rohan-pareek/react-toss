import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPinnedTeams } from '../actions/team';

function PinnedTeams({ fetchPinnedTeams, ...props }) {

    useEffect(() => {
        const params = {
            groupID: props.groupID
        }
        fetchPinnedTeams(JSON.stringify(params));
    }, [fetchPinnedTeams, props.groupID])

    return (
        <div className="previous-teams">
            {props.pinnedTeams && props.pinnedTeams.common && <h3>Common: {props.pinnedTeams.common}</h3>}
            {props.pinnedTeams
                && props.pinnedTeams.teamA
                && props.pinnedTeams.teamA.length > 0
                && <div className="teams">
                    <div className="teamA">
                        <h3>Team A</h3>
                        <ul>{props.pinnedTeams.teamA.map((player, index) => (
                            <li key = {player+'-'+index}>{player}</li>
                        ))}
                        </ul>
                    </div>
                    <div className="teamB">
                        <h3>Team A</h3>
                        <ul>{props.pinnedTeams.teamB.map((player, index) => (
                            <li key = {player+'-'+index}>{player}</li>
                        ))}
                        </ul>
                    </div></div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    players: state.player.players,
    groupID: state.group.groupID,
    pinnedTeams: state.team.pinnedTeams
})

export default connect(mapStateToProps, { fetchPinnedTeams })(PinnedTeams);
