import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/Dispatcher'
import moment from "moment";

const ACT_GETALLUSERS = 'GETALLUSERS';
const ACT_REQUESTDAYSOFF = 'REQUESTDAYSOFF';
const ACT_CANCELREQUESTEDDAYOFF = 'CANCELREQUESTEDDAYOFF';

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.data = {
            users: [],
        };

        this._actionMap = {
            [ACT_GETALLUSERS]: this._getAllUsers.bind(this),
            [ACT_REQUESTDAYSOFF]: this._requestDaysOff.bind(this),
            [ACT_CANCELREQUESTEDDAYOFF]: this._cancelRequestedDaysOff.bind(this),
        };
    }

    immutableFunc(actionData) { //TODO FINISH THE FUNCTION
        let type = actionData.type;
        let days = actionData.days;
        let newUsers = [...this.data.users];
        days.forEach(function (day) {
            let ind = newUsers.findIndex(u => u.id === actionData.id);
            newUsers[ind] = {
                ...newUsers[ind],
                [type]: [
                    ...newUsers[ind][type],
                    day
                ]
            };
        });
        return newUsers;
    }

    _getAllUsers(actionData) {
        console.log(actionData);
        this.data.users = [...actionData];
        this.emit('change');
    }

    _requestDaysOff(actionData) {
        let days = actionData.days;
        let newUsers = [...this.data.users];
        if (actionData.type === 'holidays') {
            days.forEach(function (day) {
                let ind = newUsers.findIndex(u => u.id === actionData.id);
                newUsers[ind] = {
                    ...newUsers[ind],
                    holidays: [
                        ...newUsers[ind].holidays,
                        day
                    ]
                };
            });
        } else if (actionData.type === 'remoteDays') {
            days.forEach(function (day) {
                let ind = newUsers.findIndex(u => u.id === actionData.id);
                newUsers[ind] = {
                    ...newUsers[ind],
                    remoteDays: [
                        ...newUsers[ind].remoteDays,
                        day
                    ]
                };
            });
        }

        let newData = {
            ...this.data,
            users: newUsers
        };
        this.data = newData;
        this.emit('change');
    }

    _cancelRequestedDaysOff(actionData) {
        let canceledDays = actionData.days;
        let that = this;
        let newUsers = [...this.data.users];
        if (actionData.type[0] === 'holidays' || actionData.type === 'holidays') {
            canceledDays.forEach(function (day) {
                let ind = newUsers.findIndex(u => u.id === actionData.id);
                that.data.users[ind].holidays.find(function (el, index) {
                    if (moment(el.day).format('L') === moment(day.day).format('L')) {
                        newUsers[ind] = {
                            ...newUsers[ind],
                            holidays: [
                                [...newUsers[ind].holidays.slice(0, index), ...newUsers[ind].holidays.slice(index + 1)]
                            ]
                        }
                    }
                });
            });
        } else if (actionData.type[0] === 'remoteDays' || actionData.type === 'remoteDays') {
            canceledDays.forEach(function (day) {
                let ind = newUsers.findIndex(u => u.id === actionData.id);
                that.data.users[ind].remoteDays.find(function (el, index) {
                    if (moment(el.day).format('L') === moment(day.day).format('L')) {
                        newUsers[ind] = {
                            ...newUsers[ind],
                            remoteDays: [
                                [...newUsers[ind].remoteDays.slice(0,index), ...newUsers[ind].remoteDays.slice(index + 1)]
                            ]
                        }
                    }
                });
            });
        }

        let newData = {
            ...this.data,
            users: newUsers
        };

        this.data = newData;
        this.emit('change');
    }

    getUsers() {
        return this.data.users;
    }

    handleActions(action) {
        this._actionMap[action.type] && this._actionMap[action.type](action.data);
    }
}

const userStore = new UserStore();
const UserStoreToken = dispatcher.register(userStore.handleActions.bind(userStore));
const getUserStoreToken = () => UserStoreToken;

export {getUserStoreToken};
export default userStore;