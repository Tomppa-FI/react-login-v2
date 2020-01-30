import { isUsernameTaken } from "../api/Client";

const usernameRegex = new RegExp(/^\w{4,12}$/);
const passwordRegex = new RegExp(/^(?=.*[A-Z])[A-Za-z0-9!£$%^&*()_+-=[\]{}:@~#,./\\]{8,}$/);

export default async (currentState, name, value) => {
    let newErrors;

    switch (name) {
        case "username":
            if (usernameRegex.test(value)) {
                let response = await isUsernameTaken(value);
                if (response.status === 200) {
                    newErrors = Object.assign({}, currentState.errors);
                    if (newErrors.username) {
                        delete newErrors.username;
                    }
                } else if (response.status === 409) {
                    newErrors = Object.assign({}, currentState.errors, {
                        username: {
                            message: "This username is already taken."
                        }
                    })
                } else { //API Error.
                    newErrors = Object.assign({}, currentState.errors, {
                        username: {
                            message: response.json().error
                        }
                    })
                }
            } else {
                newErrors = Object.assign({}, currentState.errors, {
                    username: {
                        message: "Your username must be between 4-12 characters, with no spacing or symbols."
                    }
                })
            }
            break;
        case "password": 
            if (passwordRegex.test(value)) {
                newErrors = Object.assign({}, currentState.errors);
                if (newErrors.password) {
                    delete newErrors.password;
                }
            } else {
                newErrors = Object.assign({}, currentState.errors, {
                    password: {
                        message: "Your password must be at least 8 characters, with 1 uppercase and no spaces."
                    }
                })
            }
            break;
        case "confirmPassword": 
            if (value === currentState.password) {
                newErrors = Object.assign({}, currentState.errors);
                if (newErrors.confirmPassword) {
                    delete newErrors.confirmPassword;
                }
            } else {
                newErrors = Object.assign({}, currentState.errors, {
                    confirmPassword: {
                        message: "Passwords do not match."
                    }
                })
            }
            break;
        default: 
            break;
    }
    return newErrors;
}