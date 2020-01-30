import React from "react";

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }
    render() {
        return(
            <div className="LoginForm-container">
                <form className="LoginForm" onSubmit={this.handleSubmit}>
                    {this.state.statusMsg && <p className="LoginForm-statusMsg">{this.state.statusMsg}</p>}
                    <div className="LoginForm-inputContainer">
                        <input type="text" className="LoginForm-usernameInput" name="username" onBlur={this.handleBlur} required/>
                    </div>

                    <div className="LoginForm-inputContainer">
                        <input type="password" className="LoginForm-passwordInput" name="password" onBlur={this.handleBlur} required/>
                    </div>

                    <div className="LoginForm-inputContainer">
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        )
    }

    handleBlur = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
    }
}

export default LoginForm;