import dispatcher from '../dispatchers/Dispatcher';
import {GetUsers, OnRequestDayOff} from "./ActionCreators";
import UserService from "../services/UserService";

export function GetAll() {
    UserService.GetAllUsers().then(response => {
        if (response) {
            dispatcher.dispatch(GetUsers(response));
        }
    });
}

export function RequestDayOff(userID, daysOff, daysOffType) {
    let data = {
        id: userID,
        days: daysOff,
        type: daysOffType,
    };
    UserService.RequestDayOff(data).then(response => {
        //if (response) {
            dispatcher.dispatch(OnRequestDayOff(data));
        //}
    });
}