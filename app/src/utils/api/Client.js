import { hashSync } from "bcryptjs";
const salt = "$2a$10$jFhdPy2nuTs0MmN2p68D5e";

export const isUsernameTaken = username => {
    const endpoint = "/api/users/username";
    const opts = {
        accept: "application/json",
        method: "GET"
    }
    return queryAPI(endpoint, username, opts);
}

export const loginUser = (username, password) => {
    return userAPI("/api/users/login", username, password);
}

export const registerUser = (username, password) => {
    return userAPI("/api/users", username, password);
}

const userAPI = (endpoint, username, password) => {
    const user = {
        username: username,
        hash: hashSync(password, salt)
    }
    
    const opts = {
        accept: "application/json",
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    }
    return queryAPI(endpoint, null, opts);
}

const queryAPI = (endpoint, query, opts) => {
    let queryString = endpoint;
    if (query) {
        queryString += `?q=${query}`;
    }
    return fetch(queryString, opts);
}