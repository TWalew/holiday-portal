import { browserHistory } from 'react-router'
import { EventEmitter } from 'events';
import dispatcher from '../dispatchers/Dispatcher'

class LocationStore extends EventEmitter {
    constructor() {
        super();
    }

    getCurrentUrl() {
        return window.location.href;
    }

    handleActions(action) {
        switch(action.type) {
            case "LOGIN": {
                browserHistory.push({
                    pathname: "/Home"
                });
                this.emit('change');
                break;
            }
            case "LOGOUT": {
                browserHistory.push('/');
                this.emit('change');
                break;
            }
        }
    }
}
const locationStore = new LocationStore();
dispatcher.register(locationStore.handleActions.bind(locationStore));

export default locationStore;