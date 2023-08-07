import {Buffer} from "buffer";
import {getJwt, postRegistration} from "./requestMethods.js";

export function handleLogin (event, navigate, setIsSignInFailed) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const auth = Buffer.from(data.get('email') + ':' + data.get('password')).toString('base64');
    getJwt(auth, setIsSignInFailed)
        .then(response => {
            if(response.status !== 200) {
                setIsSignInFailed(true);
            } else {
                localStorage.setItem('jwt', response.data);
                navigate("/simulation");
                setIsSignInFailed(false);
            }
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

