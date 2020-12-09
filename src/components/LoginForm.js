import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/group';


function LoginForm(props) {

    const [groupID, setGroupID] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(groupID && groupID.trim()) {
            props.login(JSON.stringify({
                groupID: groupID.trim()
            }))
            setGroupID('');
        }
    }
    return (
        <>
           <form className = "login-form" onSubmit = {handleSubmit}>
                <input type = "text" placeholder = "Enter Your Group ID" 
                onChange = {(e) => setGroupID(e.target.value)}
                value = {groupID} maxLength = {20} />
                <button type = "submit">Login</button>  
            </form> 
        </>
    )
}

export default withRouter(connect(null, { login })(LoginForm))
