import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import moment from "moment";
import DatePicker from 'react-date-picker'
import {Modal, Button, OverlayTrigger} from "react-bootstrap";
import * as UserActions from '../actions/UserActions';
import LoginStore from "../stores/LoginStore";
import UserStore from "../stores/UserStore";
import '../../css/WallChart.scss';

export default class WallChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDay(),
            monthNames: ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],
            loggedInUser: null,
            datePickerStartDate: new Date(),
            datePickerEndDate: new Date(),
            typeValue: 'holiday',
            startingValue: 'morning',
            endingValue: 'endOfDay',
            days: [],
            users: [],
            modalData: {
                user: null,
                day: null
            },
        };
        this.loginStoreChanged = this.loginStoreChanged.bind(this);
        this.userStoreChanged = this.userStoreChanged.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
        this.getDateArray = this.getDateArray.bind(this);
        this.checkHalf = this.checkHalf.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
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

    getDateArray(start, end) {
        let arr = [];
        let dt = new Date(start);
        while (dt <= end) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        if (start.getTime() !== end.getTime()) {
            arr.push(new Date(end));
        }
        return arr;
    }

    checkHalf(start, end, current) {
        if (start.getTime() === end.getTime()) {
            if (this.state.startingValue === 'morning' && this.state.endingValue === 'endOfDay') {
                return 'both'
            } else if (this.state.startingValue === 'morning' && this.state.endingValue === 'lunchtime') {
                return 'first';
            } else if (this.state.startingValue === 'afternoon' && this.state.endingValue === 'endOfDay') {
                return 'second';
            }
        } else if (start.getTime() !== end.getTime() && start.getTime() === current.getTime()) {
            if (this.state.startingValue === 'morning' && this.state.endingValue === 'endOfDay') {
                return 'both'
            } else if (this.state.startingValue === 'morning' && this.state.endingValue === 'lunchtime') {
                return 'both';
            } else if (this.state.startingValue === 'afternoon' && this.state.endingValue === 'endOfDay') {
                return 'second';
            } else if (this.state.startingValue === 'afternoon' && this.state.endingValue === 'lunchtime') {
                return 'second'
            }
        } else if (start.getTime() !== end.getTime() && end.getTime() === current.getTime()) {
            if (this.state.startingValue === 'morning' && this.state.endingValue === 'endOfDay') {
                return 'both'
            } else if (this.state.startingValue === 'morning' && this.state.endingValue === 'lunchtime') {
                return 'first';
            } else if (this.state.startingValue === 'afternoon' && this.state.endingValue === 'endOfDay') {
                return 'both';
            } else if (this.state.startingValue === 'afternoon' && this.state.endingValue === 'lunchtime') {
                return 'first'
            }
        } else return 'both'
    }

    getDaysInMonth() {
        let year = this.state.year;
        let month = this.state.month;
        let day = this.state.day;
        let date = new Date(year, month, day);
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

    handleClose() {
        this.setState({show: false});
    }

    handleShow(user, day) {
        this.setState({
            datePickerStartDate: day.date,
            datePickerEndDate: day.date,
            modalData: {
                user: user
            },
            show: true,
        });
    }

    handleSubmit() {
        let that = this;
        let dateArr = this.getDateArray(this.state.datePickerStartDate, this.state.datePickerEndDate);
        let data = {
            id: this.state.modalData.user.id,
            days: [],
            type: this.state.typeValue,
        };

        dateArr.forEach(function (value, index, array) {
            if (index === 0) {
                let half = that.checkHalf(array[0], array[array.length - 1], value);
                data.days.push({day: value, half: half});
            } else if (index === array.length - 1) {
                let half = that.checkHalf(array[0], array[array.length - 1], value);
                data.days.push({day: value, half: half});
            } else {
                let half = that.checkHalf(array[0], array[array.length - 1], value);
                data.days.push({day: value, half: half})
            }
        });
        console.log('DATAAAAAAAAA : ', data);
        UserActions.RequestDayOff(data);
        this.setState({
                show: false
            }
        );
    }

    changeMonth(direction) {
        if (direction === 'next'){
            alert('next');
        }  else {
            alert('prev');
        }
    }

    onStartValueChange = datePickerStartDate => this.setState({datePickerStartDate});
    onEndValueChange = datePickerEndDate => this.setState({datePickerEndDate});

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
                                                return value.day.getDate() === day.date.getDate() && (value.half === 'first' || value.half === 'both');
                                            }) ? ' holiday' : '')
                                            + (user.remoteDays.find(function (value) {
                                                return value.day.getDate() === day.date.getDate() && (value.half === 'first' || value.half === 'both');
                                            }) ? ' remote' : '')
                                            }>
                                                <span>{day.id}</span>
                                            </div>
                                            <div onClick={() => {
                                                this.handleShow(user, day)
                                            }} className={'second '
                                            + (day.dayOfWeek !== 'S' ? 'day' : 'nwd')
                                            + (user.holidays.find(function (value) {
                                                return value.day.getDate() === day.date.getDate() && (value.half === 'second' || value.half === 'both');
                                            }) ? ' holiday' : '')
                                            + (user.remoteDays.find(function (value) {
                                                return value.day.getDate() === day.date.getDate() && (value.half === 'second' || value.half === 'both');
                                            }) ? ' remote' : '')
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
                        <Modal.Title className="text-center">Book time off</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className='row clearfix'>
                                <div className="col-sm-12 form-group type">
                                    <label htmlFor="typeSel">Type:</label>
                                    <select id="typeSel"
                                            name="BookType"
                                            value={this.state.typeValue}
                                            onChange={evt => this.updateTypeValue(evt)}>
                                        <option defaultValue value="holiday">Holiday</option>
                                        <option value="remote">Remote</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-sm-6 form-group">
                                    <label htmlFor="fromDate">Starting:</label>
                                    <div className="clearfix">
                                        <div className="date">
                                            <DatePicker
                                                id='fromDate'
                                                minDate={new Date()}
                                                clearIcon={null}
                                                calendarIcon={null}
                                                onChange={this.onStartValueChange}
                                                value={this.state.datePickerStartDate}
                                            />
                                        </div>
                                        <div className="time">
                                            <select name="Starting" value={this.state.startingValue}
                                                    onLoad={evt => this.updateStartingValue(evt)}
                                                    onChange={evt => this.updateStartingValue(evt)}>
                                                <option value="morning">Morning</option>
                                                <option value="afternoon">Afternoon</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 form-group">
                                    <label for="toDate">Ending:</label>
                                    <div className="clearfix">
                                        <div className="date">
                                            <DatePicker
                                                id="toDate"
                                                minDate={new Date()}
                                                clearIcon={null}
                                                calendarIcon={null}
                                                onChange={this.onEndValueChange}
                                                value={this.state.datePickerEndDate} ß
                                            />
                                        </div>
                                        <div className="time">
                                            <select name="Ending" value={this.state.endingValue}
                                                    onLoad={evt => this.updateStartingValue(evt)}
                                                    onChange={evt => this.updateEndingValue(evt)}>
                                                <option
                                                    disabled={this.state.datePickerStartDate.getDate() === this.state.datePickerEndDate.getDate() && this.state.startingValue === 'afternoon'}
                                                    value="lunchtime">
                                                    Lunchtime
                                                </option>
                                                <option
                                                    value="endOfDay">
                                                    End of Day
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="pull-right btn-success" onClick={this.handleSubmit}>Submit</Button>
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
                        <th className="month-pagination" colSpan={10}>
                            <a onClick={() => {
                                this.changeMonth('prev');
                            }}>
                                <FontAwesomeIcon icon="arrow-left"/>
                            </a>
                            <a onClick={() => {
                                this.changeMonth('next');
                            }}>
                                <FontAwesomeIcon icon="arrow-right"/>
                            </a>
                            <span>{this.state.monthNames[this.state.month]} {this.state.year}</span>
                        </th>
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