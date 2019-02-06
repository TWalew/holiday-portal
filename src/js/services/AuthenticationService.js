const data = {
    'users': [
        { id: 0, username: 'Toni', password: 'Valev', name: 'Toni Valev', role: 'user', team: 'Front End', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 1, username: 'Kiril', password: 'Dolashkov', name: 'Kiril Dolashkov', role: 'user', team: 'Front End', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 2, username: 'Peter', password: 'Chan', name: 'Peter Chan', role: 'user', team: 'Front End', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 3, username: 'Hristo', password: 'Kostov', name: 'Hristo Kostov', role: 'user', team: 'Back End', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 4, username: 'Petromir', password: 'Dzhunev', name: 'Petromir Dzhunev', role: 'user', team: 'Back End', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 5, username: 'Plamen', password: 'Kamenov', name: 'Plamen Kamenov', role: 'user', team: 'Back End', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 6, username: 'Georgi', password: 'Petrov', name: 'Georgi Petrov', role: 'user', team: 'Database', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 7, username: 'Dimitar', password: 'Stefanov', name: 'Dimitar Stefanov', role: 'user', team: 'Database', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 8, username: 'Datsko', password: 'Petrunov', name: 'Datsko Petrunov', role: 'user', team: 'Int', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 9, username: 'Vladimir', password: 'Angelov', name: 'Vladimir Angelov', role: 'user', team: 'QA', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 10, username: 'Silviya', password: 'Ivanova', name: 'Silviya Ivanova', role: 'user', team: 'QA', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 11, username: 'Veselin', password: 'Petrov', name: 'Veselin Petrov', role: 'user', team: 'QA', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 12, username: 'admin', password: 'admin', name: 'Petar Hadzhiev', role: 'admin', team: 'TL', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
        { id: 13, username: 'Leslie', password: 'Leahy', name: 'Leslie Leahy', role: 'admin', team: 'PO', remoteDays: [], sickLeave: [], unpaidLeave: [],holidays: [] },
    ]
};
export { data };

export default class AuthenticationService {
    static Login(username, password) {

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