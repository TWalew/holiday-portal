import LoginStore from "../stores/LoginStore";
import React from "react";
import PropTypes from 'prop-types';
import {Navbar, NavDropdown, NavbarBrand, Nav, NavItem, MenuItem, NavbarHeader} from 'react-bootstrap';

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
                            <NavItem onClick={this.props.onClick}>
                                Log Out
                            </NavItem>) : null}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
Header.propTypes = {onClick: PropTypes.func};