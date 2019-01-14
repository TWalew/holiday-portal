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
                dayOfWeek: new Date(date).toString().substring(0,3)
            });
            date.setDate(date.getDate() + 1);
        }

        return days;
    }

    render() {
        const DaysComponents = this.getDaysInMonth.map((day) =>{
            return <li key={day.id}>
                        <b>{day.dayOfWeek}</b>
                        <span>{day.id}</span>
                   </li>
        });
        return (
            <div className="calendar-timeline">
                <h1>WALLCHART</h1>
                <ul>{DaysComponents}</ul>
            </div>
        )
    }

}