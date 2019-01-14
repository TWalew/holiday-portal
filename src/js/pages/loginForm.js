import React from "react";
import * as AuthenticationActions from "../actions/AuthenticationActions";
import '../../css/LoginForm.scss';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            password: this.props.password,
            user: this.props.user
        };
        this.loginClicked = this.loginClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (event.target.type === 'text') {
            this.setState({
                username: event.target.value
            })
        }else if (event.target.type === 'password') {
            this.setState({
                password: event.target.value
            })
        }

    }

    loginClicked() {
        const username = this.state.username;
        const password = this.state.password;
        console.log("STATE  :  " + this.state.username);
        AuthenticationActions.LoginAuth(username, password);
    }

    render() {

        return (
            <form className='container'>
                <label>
                    Username:
                    <input type="text" value={this.state.username} onChange={this.handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password"  value={this.state.password} onChange={this.handleChange} />
                </label>
                <input className="btn btn-outline-success" type="submit" value="Sign In" onClick={this.loginClicked}/>
            </form>
        )
    }
}