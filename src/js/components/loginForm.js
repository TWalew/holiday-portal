import React from "react";
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            password: this.props.password,
            user: this.props.user
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {

        event.preventDefault();
        for (let i = 0; i <= this.state.user.length - 1; i++) {
            if (this.state.user[i].username === this.state.username && this.state.user[i].password === this.state.password) {
                alert('Success');
                return
            }
        }
        alert('error');
    }

    render() {
        console.log(this.props);
        console.log(this.state);
        return (
            <form>
                <label>
                    Username:
                    <input type="text" value={this.state.username} onChange={this.handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password"  value={this.state.password} onChange={this.handleChange} />
                </label>
                <input type="submit" onClick={this.handleSubmit}/>
            </form>
        )
    }
}