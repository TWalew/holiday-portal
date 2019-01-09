import React from "react";
import ReactDOM from 'react-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.type === 'text'){
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
        for (let i = 0; i <= credentials.length - 1; i++) {
            if (credentials[i].username === this.state.username && credentials[i].password === this.state.password) {
                alert('Success');
                return
            }
        }
        alert('error');
    }

    render() {
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