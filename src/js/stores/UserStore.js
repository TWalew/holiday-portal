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

    handleActions(action) {
        switch (action.type) {
            case "GETALLUSERS": {
                this.data.users = action.data;
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