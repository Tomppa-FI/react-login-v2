import React from 'react';
import {BrowserRouter as Router,
        Route,
        Switch} from "react-router-dom";

import Navbar from "./components/Navbar";
import './App.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from "./components/LoginForm";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                username: undefined,
                userID: undefined,
            }
        }
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar />

                    <Switch>
                        <Route path="/register">
                            <RegisterForm />
                        </Route>
                        <Route path="/login">
                            <LoginForm />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }

    handleLogin = userDetails => {
        console.log(userDetails);
    }

    setUser = userObj => {
        console.log(userObj);
    }
}

export default App;
