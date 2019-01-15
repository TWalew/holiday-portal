import React from 'react';
import moment from "moment";
import '../../css/WallChart.scss';
import LoginStore from "../stores/LoginStore";

export default class WallChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [],
            loggedInUser: null,
        };
        this.loginStoreChanged = this.loginStoreChanged.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this)
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
        console.log(loggedInUser);
        this.setState({
            loggedInUser,
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
        const loggedInUser = this.state.loggedInUser;
        console.log('loggedInUser', loggedInUser);
        console.log('today', today);
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
        // const PersonComponent = loggedInUser.map((usr) => {
        //     return (
        //         <div key={usr.id}>
        //             <span>Circle</span>
        //             <a className='person'>{usr.name}</a>
        //         </div>
        //     )
        // });
        return (
            <div className="calendar-timeline">
                <h1>WALLCHART</h1>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={10}>Pager Component here!</th>
                        </tr>
                        <tr>
                            <th>
                                <div>EMPTY DIV TO Fill user space</div>
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
                    <tbody>
                        <tr>
                            <th>
                                User Here
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
                    </tbody>
                </table>
            </div>
        )
    }
}