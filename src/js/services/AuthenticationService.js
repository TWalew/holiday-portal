export default class AuthenticationService {
    static Login(username, password) {
        let data = {
            'users': [
                { id: 0, username: 'Toni', password: 'Valev', name: 'Toni Valev' },
                { id: 1, username: 'admin', password: 'admin', name: 'Urbanise' }
            ]
        };

        return (
            Promise.resolve(data.users).then(function (value) {
                if (
                    value.find(function (element) {
                    console.log('element   ' +  element.username);
                    console.log('username   ' + username);
                    console.log('RETURN  ' + element.username === username);
                    return element.username === username;
                }) && value.find(function (element) {
                    console.log('element   ' +  element.password);
                    console.log('password   ' + password);
                    console.log('RETURN  ' + element.password === password);
                    return element.password === password;
                })) {
                    alert('SUCCESS');
                    return value;
                }else {
                    alert('ERROR');
                }
                // console.log('logaa   ' + data.users.find(username));
                //if (data.users.find(username) && data.users.find())
            })
        )


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