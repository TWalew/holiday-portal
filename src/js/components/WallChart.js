import React from 'react';
import moment from "moment";
import '../../css/WallChart.scss';
import LoginStore from "../stores/LoginStore";
import UserStore from "../stores/UserStore";
import * as AuthenticationActions from "../actions/AuthenticationActions";
import * as UserActions from '../actions/UserActions';

export default class WallChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [],
            loggedInUser: null,
            users: [],
        };
        this.loginStoreChanged = this.loginStoreChanged.bind(this);
        this.userStoreChanged = this.userStoreChanged.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
    }

    componentDidMount() {
        LoginStore.on("change", this.loginStoreChanged);
        this.loginStoreChanged();
        UserStore.on("change", this.userStoreChanged);
        this.userStoreChanged();
    }

    componentWillUnmount() {
        LoginStore.removeListener("change", this.loginStoreChanged);
        UserStore.removeListener("change", this.userStoreChanged);
    }

    loginStoreChanged() {
        let loggedInUser = LoginStore.getUser();
        this.setState({
            loggedInUser,
        });
    }

    userStoreChanged() {
        let users = UserStore.getUsers();
        console.log("USERSSS", users);
        this.setState({
            users,
        });
    }

    getDaysInMonth() {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let date = new Date(year, month, 1);
        let days = [];
        while (date.getMonth() === month) {
            days.push({
                id: new Date(date).getDate(),
                date: new Date(date),
                dayOfWeek: new Date(date).toString().substring(0, 1)
            });
            date.setDate(date.getDate() + 1);
        }

        return days;
    }

    render() {
        const days = this.getDaysInMonth();
        const today = new Date().getDate();
        const users = this.state.users;
        const DaysOFWeekComponents = days.map((day) => {
            return (
                <th key={day.id}>
                    <span className={"wkday" + (today === day.id ? ' day-today' : '')}>{day.dayOfWeek}</span>
                </th>
            )
        });
        const DaysComponent = days.map((day) => {
            return (
                <td className={(day.dayOfWeek !== 'S' ? 'day' : 'nwd')} key={day.id}>
                    <span>{day.id}</span>
                </td>
            )
        });
        const PersonComponent = users.map((user) => {
            return (
                <tr key={user.id}>
                    <th className="person">
                        <div className="person_container">
                            <span className="img-circle">TV</span>
                            <a className='person'>{user.name}</a>
                        </div>
                    </th>
                    <td>
                        <table>
                            <tbody>
                            <tr className="days-container">
                                {DaysComponent}
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            )
        });
        return (
            <div className="calendar-timeline">
                <h1>WALLCHART</h1>
                <table>
                    <thead>
                        <tr>
                            <th><div></div></th>
                            <th colSpan={10}>Pager Component here!</th>
                        </tr>
                        <tr>
                            <th>
                                <div></div>
                            </th>
                            <th>
                                <table>
                                    <thead>
                                        <tr className="days-of-week">
                                            {DaysOFWeekComponents}
                                        </tr>
                                    </thead>
                                </table>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="users-container">
                        {PersonComponent}
                    </tbody>
                </table>
            </div>
        )
    }
}