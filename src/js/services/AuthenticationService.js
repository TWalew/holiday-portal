import {DoHttpRequest} from './HttpRequest';

export default class AuthenticationService {
    static Login(username, password) {
        return (
            DoHttpRequest({
                method: 'GET',
                url: `/users?filter=${JSON.stringify({username: username, password: password})}`
            }).then(function (response) {
                console.log('OK', response);
                    return response;
                }
            ).catch((e) => console.log('ERR', e))
        )
    }
}