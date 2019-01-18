import React from 'react';
import moment from "moment";
import '../../css/WallChart.scss';
import LoginStore from "../stores/LoginStore";
import UserStore from "../stores/UserStore";
import {Modal, Button, OverlayTrigger} from "react-bootstrap";
import * as UserActions from '../actions/UserActions';

export default class WallChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            loggedInUser: null,
            typeValue: '',
            startingValue:'',
            endingValue:'',
            days: [],
            users: [],
            modalData: {
                user: null,
                day: null
            }
        };
        this.loginStoreChanged = this.loginStoreChanged.bind(this);
        this.userStoreChanged = this.userStoreChanged.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
        this.onDayClick = this.onDayClick.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log("userStoreChanged", users);
        this.setState({
            users,
        });
    }

    onDayClick(id, day, type, half) {
        let data = {
            id,
            day,
            type,
            half
        };
        UserActions.RequestDay(data);
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

    handleClose() {
        this.setState({show: false});
    }

    handleShow(user, day) {
        this.setState({
            show: true,
            modalData: {
                user: user,
                day: day
            }
        });
    }

    handleSubmit() {
        this.setState({
                show: false
            }
        );
        console.log('startingValue   ' , this.state.startingValue);
        console.log('endingValue   ' , this.state.endingValue);
        let data = {
            id: this.state.modalData.user.id,
            day: this.state.modalData.day.date,
            type: this.state.typeValue,
            half: 'first'
        };
        UserActions.RequestDay(data);
    }

    updateTypeValue(evt) {
        this.setState({
            typeValue: evt.target.value
        });
    }
    updateStartingValue(evt) {
        this.setState({
            startingValue: evt.target.value
        });
    }
    updateEndingValue(evt) {
        this.setState({
            endingValue: evt.target.value
        });
    }

    render() {
        const days = this.getDaysInMonth();
        const users = this.state.users;
        const DaysOFWeekComponents = days.map((day) => {
            const today = new Date().getDate();
            return (
                <th key={day.id}>
                    <span className={"wkday" + (today === day.id ? ' day-today' : '')}>{day.dayOfWeek}</span>
                </th>
            )
        });
        console.log('UserS', users);
        const PersonComponent = users.map((user) => {
            let match = user.name.match(/\b(\w)/g);
            let acronym = match.join('');
            return (
                <tr key={user.id}>
                    <th className="person">
                        <div className="person_container">
                            <span className="img-circle">{acronym}</span>
                            <a className='person'>{user.name}</a>
                        </div>
                    </th>
                    <td>
                        <table>
                            <tbody>
                            <tr className="days-container">{
                                days.map((day) => {
                                    return (
                                        <td key={day.id}>
                                            <div onClick={() => {
                                                this.handleShow(user, day)
                                            }} className={'first '
                                            + (day.dayOfWeek !== 'S' ? 'day' : 'nwd')
                                            + (user.holidays.find(function (value) {
                                                return value[0].getTime() === day.date.getTime() && value[1] === 'first';
                                            }) ? ' holiday' : '')
                                            }>
                                                <span>{day.id}</span>
                                            </div>
                                            <div onClick={() => {
                                                this.onDayClick(user.id, day.date, 'holiday', 'second')
                                            }} className={'second '
                                            + (day.dayOfWeek !== 'S' ? 'day' : 'nwd')
                                            + (user.holidays.find(function (value) {
                                                return value[0].getTime() === day.date.getTime() && value[1] === 'second';
                                            }) ? ' holiday' : '')
                                            }>
                                            </div>
                                        </td>
                                    )
                                })
                            }</tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            )
        });
        return (
            <div className="calendar-timeline">
                <h1 className="text-center">WALLCHART</h1>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Book time off</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label>
                                Starting
                                <select name="Starting" value={this.state.startingValue} onChange={evt => this.updateStartingValue(evt)}>
                                    <option value="morning">Morning</option>
                                    <option value="afternoon">Afternoon</option>
                                </select>
                            </label>
                            <label>
                                Ending
                                <select name="Ending" value={this.state.endingValue} onChange={evt => this.updateEndingValue(evt)}>
                                    <option value="lunchtime">Lunchtime</option>
                                    <option value="endOfDay">End of Day</option>
                                </select>
                            </label>
                            <label>
                                Type
                                <select name="BookType" value={this.state.typeValue} onChange={evt => this.updateTypeValue(evt)}>
                                    <option value="holiday">Holiday</option>
                                    <option value="remote">Remote</option>
                                </select>
                            </label>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="pull-right btn-success" onClick={ this.handleSubmit }>Submit</Button>
                        <Button className="pull-left btn-danger" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>


                <br/>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <div></div>
                        </th>
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