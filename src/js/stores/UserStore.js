import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/Dispatcher'

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.data = {
            users: [],
        };
    }

    getUsers() {
        return this.data.users;
    }
    // TODO FINISH THE FUNCTION AND REMOVE IT FROM HERE IN A NEW FILE THEN EXPORT IT AND USE IT IN ALL STORES
    updateStoreWithoutMutation(state, path, value) {
        // let g_path = ['c', 'e', 2, 'g'];

        let traverse_path = (path, obj) => {
            let currentObj = obj;
            for (let segment of path) {
                currentObj = currentObj[segment];
                console.log('segment', segment);
                console.log('currentObj', currentObj);
                if (typeof segment === "string") {
                    let newObj = [state];
                    newObj[segment] = {
                        ...newObj[segment],
                        segment: [...newObj[segment].segment, value]
                    };
                    state = {
                        ...state,
                        segment: newObj
                    };
                    return state
                }
                console.log('test', currentObj);
            }
        };
        console.log(traverse_path(path, state));
    };

    handleActions(action) {
        switch (action.type) {
            case "GETALLUSERS": {
                this.data.users = [...action.data];
                this.emit('change');
                break;
            }
            case "REQUESTDAYSOFF": {
                console.log('ACTION', action.data);
                //this.updateStoreWithoutMutation(this.data,['users',[1], 'holidays', this.data.users[1].holidays.length],action.data.date);

                // WORKING IMMUTABLE EXAMPLE TODO A IMMUTABLE FUNCTION


                let days = action.data.days;
                let newUsers = [...this.data.users];
                if (action.data.type === 'holiday') {
                    days.forEach(function (day) {
                        newUsers[action.data.id] = {
                            ...newUsers[action.data.id],
                            holidays: [
                                ...newUsers[action.data.id].holidays,
                                day
                            ]
                        };
                    });
                } else if (action.data.type === 'remote') {
                    days.forEach(function (day) {
                        newUsers[action.data.id] = {
                            ...newUsers[action.data.id],
                            remoteDays: [
                                ...newUsers[action.data.id].remoteDays,
                                day
                            ]
                        };
                    });
                }



                let newData = {
                    ...this.data,
                    users: newUsers
                };
                console.log('thisData', this.data);
                console.log('newData',newData);
                this.data = newData;
                // let index = 0;
                // console.log(newUsers[index]);
                // newUsers[index] = {
                //     ...newUsers[index],
                //     holidays: [...newUsers[index].holidays, action.data.day],
                // };
                // this.data = {
                //     ...this.data,
                //     users: newUsers,
                // };
                // console.log(this.data);


                // console.log(action.data.date);
                // this.data.users[action.data.id].holidays.push(action.data.day);
                // console.log(this.data.users);
                // this.data = myCOllFunc(this.data,
                //     ['users', index, 'holidays', this.data.users[index].holidays.length],
                //     action.data.date);
                this.emit('change');
                break;
            }
        }
    }
}

const userStore = new UserStore();
const UserStoreToken = dispatcher.register(userStore.handleActions.bind(userStore));
const getUserStoreToken = () => UserStoreToken;

export {getUserStoreToken};
export default userStore;