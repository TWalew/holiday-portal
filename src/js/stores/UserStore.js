import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/Dispatcher'

const ACT_GETALLUSERS = 'GETALLUSERS';
const ACT_REQUESTDAYSOFF  = 'REQUESTDAYSOFF';
class UserStore extends EventEmitter {
    constructor() {
        super();

        this.data = {
            users: [],
        };

        this._actionMap = {
            [ACT_GETALLUSERS]: this._getAllUsers.bind(this),
            [ACT_REQUESTDAYSOFF]: this._requestDaysOff.bind(this),
        };
    }

    immutableFunc(actionData){ //TODO FINISH THE FUNCTION
        let type = actionData.type;
        let days = actionData.days;
        let newUsers = [...this.data.users];
        days.forEach(function (day) {
            let ind = newUsers.findIndex(u => u.id === actionData.id);
            newUsers[ind] = {
                ...newUsers[actionData.id],
                [type]: [
                    ...newUsers[actionData.id][type],
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

    _requestDaysOff(actionData){
        let days = actionData.days;
        let newUsers = [...this.data.users];
        if (actionData.type === 'holidays') {
            days.forEach(function (day) {
                newUsers[newUsers.findIndex(u => u.id === actionData.id)] = {
                    ...newUsers[actionData.id],
                    holidays: [
                        ...newUsers[actionData.id].holidays,
                        day
                    ]
                };
            });
        } else if (actionData.type === 'remoteDays') {
            days.forEach(function (day) {
                newUsers[newUsers.findIndex(u => u.id === actionData.id)] = {
                    ...newUsers[actionData.id],
                    remoteDays: [
                        ...newUsers[actionData.id].remoteDays,
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