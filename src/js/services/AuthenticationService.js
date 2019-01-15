export default class AuthenticationService {
    static Login(username, password) {
        let data = {
            'users': [
                { id: 0, username: 'Toni', password: 'Valev', name: 'Toni Valev' },
                { id: 1, username: 'admin', password: 'admin', name: 'Urbanise' }
            ]
        };

        return (
            Promise.resolve(data.users)
                .then(users => users.find(user => user.password === password && user.username === username))
        );


        // FOR GETTING DATA FROM SERVER
        // return (
        //     DoHttpRequest({
        //         method: 'GET',
        //         url: `/users?filter=${JSON.stringify({username: username, password: password})}`
        //     }).then(function (response) {
        //         console.log('OK', response);
        //             return response;
        //         }
        //     ).catch((e) => console.log('ERR', e))
        // )
    }
    static Logout () {
        return (
            Promise.resolve().then(function () {
                return true;
            })
        )
    }
}