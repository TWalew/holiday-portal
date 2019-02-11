import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/Dispatcher'
import moment from "moment";

const ACT_GETALLUSERS = 'GETALLUSERS';
const ACT_REQUESTDAYSOFF = 'REQUESTDAYSOFF';
const ACT_CANCELREQUESTEDDAYSOFF = 'CANCELREQUESTEDDAYSOFF';

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.data = {
            users: [],
        };

        this._actionMap = {
            [ACT_GETALLUSERS]: this._getAllUsers.bind(this),
            [ACT_REQUESTDAYSOFF]: this._requestDaysOff.bind(this),
            [ACT_CANCELREQUESTEDDAYSOFF]: this._cancelRequestedDaysOff.bind(this),
        };
    }

    _getAllUsers(actionData) {
        this.data.users = [...actionData];
        this.emit('change');
    }

    _requestDaysOff(actionData) {
        let days = actionData.days,
        newUsers = [...this.data.users],
        type = actionData.type;

        days.forEach(function (day,index) {
        let ind = newUsers.findIndex(u => u.id === actionData.id);
            if (days.index !== index) {
                newUsers[ind] = {
                    ...newUsers[ind],
                    [type]: [
                        ...newUsers[ind][type],
                        day
                    ],
                    remainingDays: newUsers[ind].remainingDays - 1
                };
            }
        });

        let newData = {
            ...this.data,
            users: newUsers
        };
        this.data = newData;
        this.emit('change');
    }

    _cancelRequestedDaysOff(actionData) {
        let canceledDays = actionData.days,
        newUsers = [...this.data.users],
        type = actionData.type;

        canceledDays.forEach(function (day) {
            let ind = newUsers.findIndex(u => u.id === actionData.id);
            newUsers[ind][type].forEach(function (el, index) {
                if (moment(el.day).format('L') === moment(day.day).format('L')) {
                    newUsers[ind] = {
                        ...newUsers[ind],
                        [type]: [
                            ...newUsers[ind][type].slice(0,index), ...newUsers[ind][type].slice(index + 1)
                        ],
                        remainingDays: newUsers[ind].remainingDays + 1
                    }
                }
            });
        });

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