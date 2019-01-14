import { EventEmitter } from 'events';
import dispatcher from '../dispatchers/Dispatcher'

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
                this.data.loggedIn = null;
                this.emit('change');
                break;
            }
        }
    }
}
const loginStore = new LoginStore();
dispatcher.register(loginStore.handleActions.bind(loginStore));

export default loginStore;