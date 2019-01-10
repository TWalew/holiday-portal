import React from 'react';
import ReactDOM from 'react-dom';
import FakeRest from "fakerest";
import sinon from "sinon";
import moment from "moment";
import LoginForm from './js/components/loginForm';
import Home from './js/pages/Home';
import MyCalendar from "./js/pages/MyCalendar";
import { BrowserRouter, MemoryRouter, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

let data = {
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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            user: JSON.parse(req.responseText),
            toHome: false,
            date: moment().startOf('year'),
        };
    }
    render() {
        return (
            <div>
                <LoginForm user={this.state.user} />
            </div>
        )
    }
}


const root = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path='/Login' component={App} />
            <Route path='/Home' component={Home} />
            <Route path='/MyCalendar' component={MyCalendar} />
        </div>
    </BrowserRouter>,
    //<App />,
root);