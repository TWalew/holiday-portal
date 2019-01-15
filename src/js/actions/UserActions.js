import dispatcher from '../dispatchers/Dispatcher';
import { GetUsers } from "./ActionCreators";
import UserService from "../services/UserService";

export function GetAll() {
    UserService.GetAllUsers().then(response => {
        if (response) {
            dispatcher.dispatch(GetUsers(response));
        }
    });
}