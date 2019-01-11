import React from 'react';
import ReactDOM from 'react-dom';
import moment from "moment";
import LoginForm from './js/pages/loginForm';
import Home from './js/pages/Home';
import LoginStore from './js/stores/LoginStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import FakeRest from "fakerest";
import sinon from "sinon";
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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            toHome: false,
            date: moment().startOf('year'),
        };
    }
    render() {
        return (
            <div>
                <header>THIS IS A HEADER</header>
                <br/>
                {this.props.children}
                <br/>
                <footer>This is a FOOTER</footer>
            </div>
        )
    }
}


const root = document.getElementById('root');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={LoginForm} />
            <Route path="Home" component={Home} />
        </Route>
    </Router>,
root);