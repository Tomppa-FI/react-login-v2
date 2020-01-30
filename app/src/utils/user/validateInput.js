import {isUsernameTaken} from "../Client";

const usernameRegex = new RegExp(/^\w{4,12}$/);
const passwordRegex = new RegExp(/^(?=.*[A-Z])[A-Za-z0-9!£$%^&*()_+-=[\]{}:@~#,./\\]{8,}$/);

export default async (currentState, name, value) => {
    const errors = {...currentState.errors};
    switch (name) {
        case "username": 
            if (usernameRegex.test(value)) {
                let apiRequest = await isUsernameTaken(value);
                if (apiRequest.isTaken) {
                    errors.username = {
                        message: apiRequest.error
                    };
                } else {
                    if (errors.username) {
                        delete errors.username;
                    }
                }
            } else {
                errors.username = {
                    message: "Username must be between 4-12 Characters and contain no spaces or symbols."
                }
            }
            break;
        case "password": 
            if (passwordRegex.test(value)) {
                if (errors.password) {
                    delete errors.password;
                }
            } else {
                errors.password = {
                    message: "Password must be at least 8 characters, with 1 uppercase and no spaces."
                }
            }
            break;
        case "confirmPassword": 
            if (value === currentState.password) {
                if (errors.confirmPassword) {
                    delete errors.confirmPassword;
                }
            } else {
                errors.confirmPassword = {
                    message: "Your passwords do not match."
                }
            }
            break;
        default: 
            break;
    }
    return errors;
}