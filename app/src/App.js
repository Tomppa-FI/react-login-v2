import React from 'react';
import {BrowserRouter as Router,
        Route,
        Switch} from "react-router-dom";
import jwt from "jsonwebtoken";
import Navbar from "./components/Navbar";
import './App.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from "./components/LoginForm";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: undefined,
            sessionExpired: false,
            user: undefined
        }
    }

    componentDidMount() {
        let isLoggedIn;
        if (localStorage.getItem("token")) {
            isLoggedIn = true;
        } else {
            isLoggedIn = false;
        }
        this.setState(Object.assign({}, {
            isLoggedIn,
        }))
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.isLoggedIn !== this.state.isLoggedIn) {
            let isLoggedIn = false;
            let sessionExpired = false;
            let user;
            if (this.state.isLoggedIn) {
                const token = jwt.decode(localStorage.getItem("token"));
                if (Date.now() / 1000 > token.exp) {
                    sessionExpired = true;
                    localStorage.removeItem("token");
                } else {
                    isLoggedIn = true;
                    user = {
                        username: token.username,
                        userID: token.id
                    }
                }
            } else {
                localStorage.removeItem("token");
            }
            this.setState(
                Object.assign({}, {
                    isLoggedIn,
                    sessionExpired,
                    user
                })
            )
        }
    }

    toggleChange = isLoggedIn => {
        this.setState({
            isLoggedIn: isLoggedIn
        })
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar user={this.state.user} toggleChange={this.toggleChange}/>
                    {this.state.sessionExpired && <p>Your session has expired. Please log in.</p>}
                    <Switch>
                        <Route path="/register">
                            <RegisterForm />
                        </Route>
                        <Route path="/login">
                            <LoginForm toggleChange={this.toggleChange}/>
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
