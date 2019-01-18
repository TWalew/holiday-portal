import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from "moment";
import LoginForm from './js/pages/loginForm';
import Home from './js/pages/Home';
import LoginStore from './js/stores/LoginStore';
import LocationStore from  './js/stores/LocationStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import * as AuthenticationActions from "./js/actions/AuthenticationActions";
import * as UserActions from "./js/actions/UserActions";
import Header from "./js/components/Header";
import Footer from "./js/components/Footer";
import Redirects from "./js/components/Redirects";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            toHome: false,
            date: moment().startOf('year')
        };
        this.logOutClicked = this.logOutClicked.bind(this);
    }

    logOutClicked(){
        AuthenticationActions.LogOutAuth();
    }

    render() {
        return (
            <div>
                <Header onClick={this.logOutClicked}/>
                    <br/>
                    {this.props.children}
                    <br/>
                <Footer/>
            </div>
        )
    }
}


const root = document.getElementById('root');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={LoginForm} />

            <Route component={Redirects}>
                <Route path="/Home" component={Home} />
            </Route>
        </Route>
    </Router>,
root);