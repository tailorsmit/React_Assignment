import './App.css';
import Register from "./components/RegisterComponent";
import Login from './components/Login';
import Greet from "./components/Greet";
import OTP from "./components/OTP";
import React from "react";
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'

function App() {

    return (
        <div className="App">
            <Router>
                <Switch>
                        <Route exact path="/" component={Greet} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register}/>
                        <Route path='/verify-otp' component={OTP} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
