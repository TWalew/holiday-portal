import {data} from './AuthenticationService';

export default class UserService {
    static GetAllUsers() {
        return (
            Promise.resolve(data.users)
                .then(users => users)
        );
    }
    static RequestDayOff(holiday) {
        return (
            Promise.resolve(holiday)
                .then(holiday => holiday)
        );
    }
    static CancelRequestedHoliday(holiday) {
        return (
            Promise.resolve(holiday)
                .then(holiday => holiday)
        );
    }
}