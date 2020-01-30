import React from 'react';
import {BrowserRouter as Router,
        Route,
        Switch} from "react-router-dom";

import Navbar from "./components/Navbar";
import './App.css';
import RegisterForm from './components/RegisterForm';

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
