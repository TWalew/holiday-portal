import LoginStore from "../stores/LoginStore";
import React from "react";
import PropTypes from 'prop-types';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import Button from '@material-ui/core/Button';

const loginButton = {
    fontSize: '16px',
    margin: '5px',
};

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedInUser: null
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

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let {loggedInUser} = this.state;
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        Holiday Portal
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <Navbar.Text>
                            {loggedInUser && loggedInUser.name}
                        </Navbar.Text>
                    </Nav>
                    <Nav pullRight>
                        {loggedInUser ? (
                            <Button variant="text" color="secondary" style={loginButton} onClick={this.props.onClick}>
                                Log Out
                            </Button>) : null}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
Header.propTypes = {onClick: PropTypes.func};