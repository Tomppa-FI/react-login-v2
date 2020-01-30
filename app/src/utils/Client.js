export const isUsernameTaken = username => {
    const endpoint = "/api/user"
    const opts = {
        accept: "application/json"
    }
    const queryString = `?q=${username}`;
    return queryAPI(endpoint, queryString, opts);
}

export const sendUserToServer = user => {
    const endpoint = "/api/user"
    const opts = {
        accept: "application/json",
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    }
    return queryAPI(endpoint, null, opts)
}

const queryAPI = (endpoint, querystring, opts) => {
    let query = endpoint;
    if (querystring) {
        query += querystring;
    }
    return fetch(query, opts).then(response => response.json())
}