import React from "react";
import * as AuthenticationActions from "../actions/AuthenticationActions";
import '../../css/LoginForm.scss';
import PropTypes from 'prop-types';
import * as UserActions from "../actions/UserActions";
import {
    Avatar,
    Button,
    CssBaseline,
    FormControl,
    FormControlLabel,
    Checkbox,
    Input,
    InputLabel,
    Paper,
    Typography,
    withStyles
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class LoginForm extends React.Component {
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
        } else if (event.target.type === 'password') {
            this.setState({
                password: event.target.value
            })
        }

    }

    loginClicked() {
        const username = this.state.username;
        const password = this.state.password;
        AuthenticationActions.LoginAuth(username, password);
        UserActions.GetAll();
    }

    render() {
        const {classes} = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email"
                                   name="email"
                                   value={this.state.username}
                                   onChange={this.handleChange}
                                   autoComplete="email"
                                   autoFocus/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password"
                                   type="password"
                                   id="password"
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   autoComplete="current-password"/>
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.loginClicked}
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>
        );


        // return (
        //     <form className='container'>
        //         <label>
        //             Username:
        //             <input type="text" value={this.state.username} onChange={this.handleChange} />
        //         </label>
        //         <label>
        //             Password:
        //             <input type="password"  value={this.state.password} onChange={this.handleChange} />
        //         </label>
        //         <input className="login-button" type="submit" value="Sign In" onClick={this.loginClicked}/>
        //     </form>
        // )
    }
};

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);