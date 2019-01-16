import dispatcher from '../dispatchers/Dispatcher';
import {GetUsers, OnDayClicked} from "./ActionCreators";
import UserService from "../services/UserService";

export function GetAll() {
    UserService.GetAllUsers().then(response => {
        if (response) {
            dispatcher.dispatch(GetUsers(response));
        }
    });
}

export function RequestDay(data) {
    UserService.RequestHoliday(data).then(response => {
        //if (response) {
            dispatcher.dispatch(OnDayClicked(data));
        //}
    });
}