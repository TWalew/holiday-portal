import React from "react";
import {Redirect} from "react-router-dom";

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
                this.setState({
                    toHome: true
                });
                return;
            }
        }
        alert('error');
    }

    render() {
        if (this.state.toHome === true) {
            return <Redirect to='/Home' />
        }
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