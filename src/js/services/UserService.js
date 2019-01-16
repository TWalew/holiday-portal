import {data} from './AuthenticationService';

export default class UserService {
    static GetAllUsers() {
        return (
            Promise.resolve(data.users)
                .then(users => users)
        );
    }
    static RequestHoliday(holiday) {
        alert('heyHoLetsGo');
        return (
            Promise.resolve(holiday)
                .then(holiday => holiday)
        );
    }
}