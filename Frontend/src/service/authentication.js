import {Buffer} from "buffer";
import {getJwt, postRegistration} from "./requestMethods.js";

export function handleLogin (event, navigate) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const auth = Buffer.from(data.get('email') + ':' + data.get('password')).toString('base64');
    getJwt(auth)
        .then(jwt => {
            localStorage.setItem('jwt', jwt);
            navigate("/simulation");
        })
        .catch(error => console.log('error in handleLogin: ' + error));
}

export function handleRegister(event, navigate) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    postRegistration(data)
        .then(() => navigate("/"))
        .catch(error => console.log("Error in handleRegister: " + error));
}

