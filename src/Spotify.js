
//creating URL for logIn.......

export const authEndpoint= "https://accounts.spotify.com/authorize";
const  redirectUri = "http://localhost:3000/";
const clientId = "5a9b7784954644ac8588df8fa0e058f4"


const scopes =[
    "user-read-email",
    "user-read-private",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
];


export const loginUrl =`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;

// extracting success token from URL........

export const getTokenFromUrl = ()=>{
    var hash= window.location.hash.substring(1).split('&');
    let _token= {};
    hash.forEach(e =>{
        let keyValue = e.split('=');
        _token[keyValue[0]] = keyValue[1];
    });
   return _token;
}


