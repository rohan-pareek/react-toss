import React, { useState } from 'react'
import { connect } from 'react-redux';

function AddPlayer(props) {

    const [player, setPlayer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(player && player.trim()) {
            props.addPlayer2({
                groupID: props.groupID,
                player: player.trim()
            });
            setPlayer('');
        }
    }

    return (
        <div>
            <form className = "add-player-form" onSubmit = {handleSubmit}>
                <input type = "text" placeholder = "Enter Player Name" value = {player}
                onChange = {e => setPlayer(e.target.value)} />
                <button>Add Player</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    groupID: state.group.groupID,
    isLoggedIn: state.group.isLoggedIn,
})

export default connect(mapStateToProps)(AddPlayer);
