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



    updateStoreWithoutMutation(state, path, value){



        // let newUsers = [this.data.users];
        // newUsers[index] = {
        //     ...newUsers[index],
        //     holidays: [...newUsers[index].holidays, action.data.date],
        // };
        // this.data = {
        //     ...this.data,
        //     users: newUsers,
        // };

        let g_path = ['c', 'e', 2, 'g'];

        let traverse_path = (path, obj) => {
            let currentObj = obj;
            for(let segment of path) {
                currentObj = currentObj[segment];
                console.log('segment', segment);
                console.log('currentObj', currentObj);
                console.log({
                    ...currentObj,
                    [currentObj.segment]: currentObj
                })
            }
            console.log('test',currentObj);
        };
        console.log(traverse_path(path,state));
    };

    handleActions(action) {
        switch (action.type) {
            case "GETALLUSERS": {
                this.data.users = action.data;
                this.emit('change');
                break;
            }
            case "ONDAYCLICKED": {
                alert("USER STORE");
                console.log(action.data);
                this.updateStoreWithoutMutation(this.data,['users',[1], 'holidays', this.data.users[1].holidays.length],action.data.date);
                // this.data.users[action.data.id].holidays = action.data.date;
                //
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