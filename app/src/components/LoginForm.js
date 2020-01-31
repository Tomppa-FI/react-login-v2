import React from "react";
import {withRouter} from "react-router-dom";
import { loginUser } from "../utils/api/Client";
class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            statusMsg: undefined,
        }
    }
    render() {
        return(
            <div className="LoginForm-container">
                <form className="LoginForm" onSubmit={this.handleSubmit}>
                    {this.state.statusMsg && <p className="LoginForm-statusMsg">{this.state.statusMsg}</p>}
                    <div className="LoginForm-inputContainer">
                        <input type="text" className="LoginForm-usernameInput" name="username" onChange={this.handleChange} required/>
                    </div>

                    <div className="LoginForm-inputContainer">
                        <input type="password" className="LoginForm-passwordInput" name="password" onChange={this.handleChange} required/>
                    </div>

                    <div className="LoginForm-inputContainer">
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        )
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        loginUser(this.state.username, this.state.password).then(response => {
            if (response.status === 200) {
                response.json().then((data) => {
                    localStorage.setItem("token", data.token);
                    this.setState({statusMsg: "Login Successful. You will be redirected in 5 seconds."}, () => {
                        setTimeout(() => {
                            this.props.toggleChange(true);
                            this.props.history.push("/");
                        }, 5000)
                    })
                })
            } else if (response.status === 403) {
                response.json().then((data) => {
                    this.setState({statusMsg: data.error});
                })
            }
        })
    }
}

export default withRouter(LoginForm);