import React from "react";
import {withRouter} from "react-router-dom";
import validateInput from "../utils/user/validateInput";
import { registerUser } from "../utils/api/Client";
import "../css/RegisterForm.css";

class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            statusMsg: undefined,
            username: "",
            password: "",
            confirmPassword: "",
            errors: {}
        }
    }

    render() {
        return (
            <div className="RegisterForm-container">
                <form className="RegisterForm" onSubmit={this.handleSubmit}>
                    {this.state.statusMsg && <p className="RegisterForm-statusMsg">{this.state.statusMsg}</p>}
                    <div className="RegisterForm-inputContainer">
                        {this.state.errors.username && <p className="RegisterForm-errorMsg">{this.state.errors.username.message}</p>}
                        <input type="text" className="RegisterForm-=input" name="username" onChange={this.handleChange} onBlur={this.handleBlur} placeholder="Username" required/>
                    </div>

                    <div className="RegisterForm-inputContainer">
                        {this.state.errors.password && <p className="RegisterForm-errorMsg">{this.state.errors.password.message}</p>}
                        <input type="password" className="RegisterForm-input" name="password" onChange={this.handleChange} onBlur={this.handleBlur} placeholder="Password" required/>
                    </div>

                    <div className="RegisterForm-inputContainer">
                        {this.state.errors.confirmPassword && <p className="RegisterForm-errorMsg">{this.state.errors.confirmPassword.message}</p>}
                        <input type="password" className="RegisterForm-input" name="confirmPassword" onChange={this.handleChange} onBlur={this.handleBlur} placeholder="Repeat password" required/>
                    </div>

                    <div className="RegisterForm-inputContainer">
                        <input classname="RegisterForm-submitBtn" type="submit"/>
                    </div>
                </form>
            </div>
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        if (Object.keys(this.state.errors).length === 0) {
            registerUser(this.state.username, this.state.password).then(response => {
                if (response.status === 200) {
                    this.setState({
                        statusMsg: "Registration successful! You will be redirected in 5 seconds."
                    }, () => {
                        setTimeout(() => this.props.history.push("/login"), 5000);
                    })
                } else {
                    response.json().then((data) => {
                        this.setState({statusMsg: data.error});
                    })
                }
            })
        } else {
            this.setState({
                statusMsg: "Error submitting form. Please check fields above are filled out correctly."
            })
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleBlur = event => {
        const name = event.target.name;
        const value = event.target.value;
        validateInput(this.state, name, value).then((newErrors) => {
            this.setState({
                errors: newErrors
            })
        })
    }
}

export default withRouter(RegisterForm);