import LoginStore from "../stores/LoginStore";
import React from "react";
import PropTypes from 'prop-types';

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedInUser: null,
        };
        this.loginStoreChanged = this.loginStoreChanged.bind(this);
    }

    componentDidMount() {
        LoginStore.on("change", this.loginStoreChanged);
        this.loginStoreChanged();
    }

    componentWillUnmount() {
        LoginStore.removeListener("change", this.loginStoreChanged);
    }

    loginStoreChanged() {
        let loggedInUser = LoginStore.getUser();

        this.setState({
            loggedInUser,
        });
    }

    render() {
        let {loggedInUser} = this.state;

        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Holiday Portal</a>
            <span>{loggedInUser && loggedInUser.name}</span>
            {
                loggedInUser ? (
                    <button className="btn btn-outline-danger" onClick={this.props.onClick}>Log Out</button>
                ) : null
            }
        </nav>;
    }
}
Header.propTypes = {onClick: PropTypes.func};