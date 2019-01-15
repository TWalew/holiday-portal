import {data} from './AuthenticationService';

export default class UserService {
    static GetAllUsers() {
        return (
            Promise.resolve(data.users)
                .then(users => users)
        );
    }
}