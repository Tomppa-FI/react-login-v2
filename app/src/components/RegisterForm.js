import React from "react";
import {withRouter} from "react-router-dom";
import validateInput from "../utils/user/validateInput";
import registerUser from "../utils/user/registerUser";

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
                        <input type="text" className="RegisterForm-usernameInput" name="username" onBlur={this.handleBlur} required/>
                        {this.state.errors.username && <p className="RegisterForm-errorMsg">{this.state.errors.username.message}</p>}
                    </div>

                    <div className="RegisterForm-inputContainer">
                        <input type="password" className="RegisterForm-passwordInput" name="password" onBlur={this.handleBlur} required/>
                        {this.state.errors.password && <p className="RegisterForm-errorMsg">{this.state.errors.password.message}</p>}

                    </div>

                    <div className="RegisterForm-inputContainer">
                        <input type="password" className="RegisterForm-passwordInput" name="confirmPassword" onBlur={this.handleBlur} required/>
                        {this.state.errors.confirmPassword && <p className="RegisterForm-errorMsg">{this.state.errors.confirmPassword.message}</p>}
                    </div>

                    <div className="RegisterForm-inputContainer">
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        if (Object.keys(this.state.errors).length === 0) {

            registerUser(this.state.username, this.state.password).then((apiResult) => {
                if (apiResult.success) {
                    this.setState(Object.assign({}, this.state, {
                        statusMsg: "Registration successful. You will be redirected in 5 seconds."
                    }), () => {
                        setTimeout(() => {
                            this.props.history.push("/");
                        }, 5000)
                    })
                } else {
                    this.setState(Object.assign({}, this.state, {
                        statusMsg: apiResult.error
                    }))
                }
            })
        } else {
            this.setState(Object.assign({}, this.state, {
                statusMsg: "Error submitting form. Please check all fields are completed."
            }))
        }
    }

    handleBlur = event => {
        const name = event.target.name;
        const value = event.target.value;
        if (this.state[name] !== value) {
            validateInput(this.state, name, value).then((errors) => {
                this.setState({
                    [name]: value,
                    errors: errors
                });
            })
        }
    }
}

export default withRouter(RegisterForm);