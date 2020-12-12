import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/group';


function SignupForm(props) {

    const [groupID, setGroupID] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (groupID && groupID.trim()) {
            props.signup(JSON.stringify({
                groupID: groupID.trim()
            }))
            setGroupID('');
        }
    }
    return (
        <>
            <form className="login-form" onSubmit={handleSubmit}>
            {props.successMessage && <div className="successMessage">{props.successMessage}</div>}
            {props.errorMessage && <div className="errorMessage">{props.errorMessage}</div>}
                <input type="text" placeholder="Enter a Group ID"
                    onChange={(e) => setGroupID(e.target.value)}
                    value={groupID} maxLength={20} />
                <button type="submit">Create Group</button>
            </form>
        </>
    )
}

const mapStateToProps = (state) => ({
    errorMessage: state.group.errorMessage,
    successMessage: state.group.successMessage
})

export default withRouter(connect(mapStateToProps, { signup })(SignupForm))
