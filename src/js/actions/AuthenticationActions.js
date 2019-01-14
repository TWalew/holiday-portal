import dispatcher from '../dispatchers/Dispatcher';
import {LogIn, LogOut} from "./ActionCreators";
import AuthenticationService from "../services/AuthenticationService";


export function LoginAuth(username, password) {
    // let req = new XMLHttpRequest();
    // req.open("GET", `/users?filter=${JSON.stringify({username: username, password: password})}`, false);
    // req.onload = function () {
    //     console.log('LOAD', this.response);
    //
    // };
    // req.send(null);
    // console.log(req.response);
    AuthenticationService.Login(username, password).then(response => {
        if (response.length) {
            dispatcher.dispatch(LogIn(response[0]));

        }
    });
}
export function LogOutAuth() {
    AuthenticationService.Logout().then(response => {
        if (response) {
            dispatcher.dispatch(LogOut(response[0]));
        }
    })
}