import { EventEmitter } from 'events';
import dispatcher from '../dispatchers/Dispatcher'
import {getLocationStoreToken} from "./LocationStore";

class LoginStore extends EventEmitter {
    constructor(){
        super();

        this.data = {
          loggedIn: null,
        };
    }

    getUser(){
        return this.data.loggedIn;
    }

    handleActions(action) {
        switch(action.type) {
            case "LOGIN": {
                this.data.loggedIn = action.data;
                this.emit('change');
                break;
            }
            case "LOGOUT": {
                dispatcher.waitFor([getLocationStoreToken()]);
                this.data.loggedIn = null;
                this.emit('change');
                break;
            }
        }
    }
}
const loginStore = new LoginStore();
const LoginStoreToken = dispatcher.register(loginStore.handleActions.bind(loginStore));
const getLoginStoreToken = () => LoginStoreToken;

export { getLoginStoreToken };
export default loginStore;