import { EventEmitter } from 'events';
import dispatcher from '../dispatchers/Dispatcher'

class LoginStore extends EventEmitter {
    constructor(props){
        super(props);

        this.Authenticate = this.Authenticate.bind(this);
    }

    Authenticate(users) {
        console.log(users);
    }

    handleActions(action) {
        console.log('ACT', action);
        switch(action.type) {
            case "LOGIN": {
                this.Authenticate(action.data);
                this.emit('change');
                break;
            }
            case "LOGOUT": {
                console.log("LOGOUT");
                break;
            }
        }
    }
}
const loginStore = new LoginStore();
dispatcher.register(loginStore.handleActions.bind(loginStore));

export default loginStore;