import { browserHistory } from 'react-router'
import { EventEmitter } from 'events';
import dispatcher from '../dispatchers/Dispatcher'
import {getLoginStoreToken} from "./LoginStore";

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
                dispatcher.waitFor([getLoginStoreToken()]);
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
            case "UNLOGGED": {
                browserHistory.push('/');
                this.emit('change');
                break;
            }
        }
    }
}
const locationStore = new LocationStore();
const LocationStoreToken = dispatcher.register(locationStore.handleActions.bind(locationStore));

const getLocationStoreToken = () => LocationStoreToken;

export { getLocationStoreToken };
export default locationStore;