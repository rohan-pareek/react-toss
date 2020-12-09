import React, { useEffect } from 'react'
import Footer from './Footer';
import Header from './Header';
import LoginForm from './LoginForm';
import Toss from './Toss';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import { login } from '../actions/group';

function Main({login, ...props}) {

    useEffect(() => {
        if(localStorage.getItem('groupID')) {
            login(JSON.stringify({
                groupID: localStorage.getItem('groupID')
            }))
        }
        
    }, [login])

    return (
        <div className="app">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" >
                        {props.isLoggedIn ? <Redirect to="/dashboard" /> : <><Toss />
                        <LoginForm /></>}
                    </Route>
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
                <Footer />
            </Router>
        </div>
    )
}

const mapStateToProps = (state) => ({
    groupID: state.group.group,
    isLoggedIn: state.group.isLoggedIn,
})

export default connect(mapStateToProps, { login })(Main);
