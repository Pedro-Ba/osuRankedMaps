module.exports = {getAPIkey, beatmapsetsSearch}

async function getAPIkey() {
    var loginValues = require('./config.json');

    const url = new URL(
        "https://osu.ppy.sh/oauth/token"
    );
    
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    };
    
    let body = "client_id=" + loginValues.client_id +
        "&client_secret=" + loginValues.client_secret +
        "&grant_type=" + loginValues.grant_type +
        "&scope=" + loginValues.scope;
    return fetch(url, {
        method: "POST",
        headers,
        body: body,
    }).then(response => response.json().then(json => json['access_token']));
}

async function beatmapsetsSearch(api_key, params){
    const url = new URL(
        "https://osu.ppy.sh/api/v2/beatmapsets/search"
    );

    Object.keys(params)
        .forEach(key => url.searchParams.append(key, params[key]));
    
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: 'Bearer ' + api_key
    };
    
    return fetch(url, {
        method: "GET",
        headers,
    }).then(response => response.json());
}