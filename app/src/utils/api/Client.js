import { hashSync, genSaltSync } from "bcryptjs";
const salt = "$2a$10$jFhdPy2nuTs0MmN2p68D5e";

export const isUsernameTaken = username => {
    const endpoint = "/api/users/username";
    const opts = {
        accept: "application/json",
        method: "GET"
    }
    return queryAPI(endpoint, username, opts);
}

export const registerUser = (username, password) => {
    const endpoint = "/api/users";
    const opts = {
        accept: "application/json",
        method: "POST",
        body: JSON.stringify({username: username, hash: hashSync(password, salt)}),
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