import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
    render() {
        return (
            <form>
                <input type="text" />
                <input type="password" />
                <input type="submit"/>
            </form>
        )
    }
}

ReactDOM.render(
    <Login />,
    document.getElementById('root')
);