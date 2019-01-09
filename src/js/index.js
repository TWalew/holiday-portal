import React from 'react';
import ReactDOM from 'react-dom';
import FakeRest from "fakerest";
import sinon from "sinon";
import LoginForm from 'components/loginForm'

let data = {
    'authors': [
        { id: 0, first_name: 'Leo', last_name: 'Tolstoi' },
        { id: 1, first_name: 'Jane', last_name: 'Austen' }
    ],
    'books': [
        { id: 0, author_id: 0, title: 'Anna Karenina' },
        { id: 1, author_id: 0, title: 'War and Peace' },
        { id: 2, author_id: 1, title: 'Pride and Prejudice' },
        { id: 3, author_id: 1, title: 'Sense and Sensibility' }
    ],
    'settings': {
        language: 'english',
        preferred_format: 'hardback',
    },
    'users': [
        { id: 0, username: 'Toni', password: 'Valev' },
        { id: 1, username: 'admin', password: 'admin' }
    ]
};
// initialize fake REST server
let restServer = new FakeRest.Server();
restServer.init(data);

// use sinon.js to monkey-patch XmlHttpRequest
let server = sinon.fakeServer.create();
server.respondWith(restServer.getHandler());


let req = new XMLHttpRequest();
req.open("GET", "/users", false);
req.send(null);
this.state.credentials = JSON.parse(req.responseText);

class App extends React.Component {
    render() {
        return (
            <LoginForm credentials={this.state.credentials} />
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);