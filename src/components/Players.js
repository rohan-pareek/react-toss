import React, { useEffect } from 'react'
import AddPlayer from './AddPlayer';
import { connect } from 'react-redux';
import { fetchPlayers, addPlayer, deletePlayer } from '../actions/player';

function Players({ fetchPlayers, ...props }) {

    useEffect(() => {
        const params = JSON.stringify({
            groupID: localStorage.getItem('groupID')
        });
        fetchPlayers(params);
    }, [fetchPlayers])

    const addPlayer2 = (payload) => {
        props.addPlayer(JSON.stringify(payload));
    }

    const handleDelete = (id) => {
        props.deletePlayer(JSON.stringify({
            playerID: id,
            groupID: props.groupID
        }))
    }

    return (
        <div className="players">
            <AddPlayer addPlayer2={addPlayer2} />
            <ul>
                {props.players && props.players.length > 0 && props.players.map(player => (

                    <li key={player._id}>{player.player}
                        <i className="fa fa-trash-o" aria-hidden="true" 
                        style = {{float: "right", cursor: "pointer"}}
                        onClick = {() => handleDelete(player._id)}></i>
                    </li>

                )
                )}
                {props.players && props.players.length === 0 &&
                    <li>No Players Found</li>
                }
            </ul>

        </div>
    )
}

const mapStateToProps = (state) => ({
    players: state.player.players,
    groupID: state.group.groupID
})

export default connect(mapStateToProps, { fetchPlayers, addPlayer, deletePlayer })(Players);
