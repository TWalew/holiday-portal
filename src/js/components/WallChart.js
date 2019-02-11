import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import moment from "moment";
import DatePicker from 'react-date-picker'
import Popup from 'reactjs-popup'
import {Modal} from "react-bootstrap";
import * as UserActions from '../actions/UserActions';
import LoginStore from "../stores/LoginStore";
import UserStore from "../stores/UserStore";
import '../../css/WallChart.scss';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const typeValues = [
    {
        value: 'holidays',
        label: 'Holiday'
    },
    {
        value: 'remoteDays',
        label: 'Remote'
    },
    {
        value: 'sickLeave',
        label: 'Sick Leave'
    },
    {
        value: 'unpaidLeave',
        label: 'Unpaid Leave'
    }
];
const startingValues = [
    {
        value: 'morning',
        label: 'Morning',
    },
    {
        value: 'afternoon',
        label: 'Afternoon',
    }
];
const endingValues = [
    {
        value: 'lunchtime',
        label: 'Lunchtime',
    },
    {
        value: 'endOfDay',
        label: 'End of Day',
    }
];

let typeVal = 'holidays';
const morning = 'morning';
const lunchtime = 'lunchtime';
const endOfDay = 'endOfDay';
const afternoon = 'afternoon';
const first = 'first';
const second = 'second';
const both = 'both';

export default class WallChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            typeValue: 'holidays',
            startingValue: 'morning',
            endingValue: 'endOfDay',
            currentDate: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
            stopDate: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)),
            loggedInUser: null,
            datePickerStartDate: new Date(),
            datePickerEndDate: new Date(),
            days: [],
            users: [],
            modalData: {
                user: null,
                day: null,
            },
        };

        this.loginStoreChanged = this.loginStoreChanged.bind(this, 5);
        this.userStoreChanged = this.userStoreChanged.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
        this.getDateArray = this.getDateArray.bind(this);
        this.checkForHalfDays = this.checkForHalfDays.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.handleModalCancel = this.handleModalCancel.bind(this);
        this.monthPagination = this.monthPagination.bind(this);
        this.checkDaysOff = this.checkDaysOff.bind(this);
        this.pushToArray = this.pushToArray.bind(this);
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
        return arr;
    }

    checkForHalfDays(start, end, current) {
        let startVal = this.state.startingValue;
        let endVal = this.state.endingValue;
        if (start.getDate() === end.getDate()) {
            if (startVal === morning && endVal === endOfDay) {
                return both;
            } else if (startVal === morning && endVal === lunchtime) {
                return first;
            } else if (startVal === afternoon && endVal === endOfDay) {
                return second;
            }
        } else if (start.getDate() !== end.getDate() && start.getDate() === current.getDate()) {
            if (startVal === morning && endVal === endOfDay) {
                return both;
            } else if (startVal === morning && endVal === lunchtime) {
                return both;
            } else if (startVal === afternoon && endVal === endOfDay) {
                return second;
            } else if (startVal === afternoon && endVal === lunchtime) {
                return second;
            }
        } else if (start.getDate() !== end.getDate() && end.getDate() === current.getDate()) {
            if (startVal === morning && endVal === endOfDay) {
                return both;
            } else if (startVal === morning && endVal === lunchtime) {
                return first;
            } else if (startVal === afternoon && endVal === endOfDay) {
                return both;
            } else if (startVal === afternoon && endVal === lunchtime) {
                return first;
            }
        } else return both;
    }

    getDaysInMonth() {
        let dateArray = [];
        let currentDate = this.state.currentDate;
        let stopDate = this.state.stopDate;
        while (currentDate < stopDate) {
            dateArray.push({
                id: moment(currentDate).get('date'),
                date: moment(currentDate)._d,
                dayOfWeek: moment(currentDate).toString().substring(0, 1)
            });
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    monthPagination(direction) {
        this.setState({
            currentDate: this.state.currentDate.add(direction, 'month'),
            stopDate: this.state.stopDate.add(direction, 'month')
        });
    }

    checkDaysOff(user, day, array) {
        user[array].find(function (el) {
            if (moment(el.day).format('L') === moment(day.date).format('L')) {
                typeVal = array;
            }
        });
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

    handleModalClose() {
        this.setState({showModal: false});
    }

    handleModalShow(user, day) {
        if (this.state.loggedInUser.id === user.id) {
            this.checkDaysOff(user, day, 'holidays');
            this.checkDaysOff(user, day, 'remoteDays');
            this.checkDaysOff(user, day, 'sickLeave');
            this.checkDaysOff(user, day, 'unpaidLeave');
            this.setState({
                datePickerStartDate: day.date,
                datePickerEndDate: day.date,
                typeValue: typeVal,
                modalData: {
                    user: user,
                },
                showModal: true,
            });
        } else {
            alert('This is not your user');
        }
    }

    pushToArray(dateArr) {
        let that = this,
            days = [];
        dateArr.forEach(function (value, index, array) {
            let half = that.checkForHalfDays(array[0], array[array.length - 1], value);
            days.push({day: value, half: half, dateRequested: moment().set({'hour': 0, 'minute': 0, 'second': 0}).format('L')});
        });
        return days;
    }

    handleModalSubmit() {
        let dateArr = this.getDateArray(this.state.datePickerStartDate, this.state.datePickerEndDate);
        let days = this.pushToArray(dateArr);
        UserActions.RequestDayOff(this.state.modalData.user.id, days, this.state.typeValue);
        this.setState({
                showModal: false
            }
        );
    }

    handleModalCancel() {
        let canceledDateArr = this.getDateArray(this.state.datePickerStartDate, this.state.datePickerEndDate);
        let canceledDays = this.pushToArray(canceledDateArr);
        UserActions.CancelRequestedHoliday(this.state.modalData.user.id, canceledDays, this.state.typeValue);
        this.setState({
                showModal: false
            }
        );
    }

    onStartValueChange = datePickerStartDate => this.setState({datePickerStartDate});
    onEndValueChange = datePickerEndDate => this.setState({datePickerEndDate});

    render() {
        const days = this.getDaysInMonth();
        const users = this.state.users;
        const DaysOFWeekComponents = days.map((day) => {
            const today = new Date();
            return (
                <th key={day.id}>
                    <span className={
                        "wkday"
                        + (today.getDate() === day.id && moment(today).format('L') === moment(day.date).format('L') ? ' day-today' : '')}
                    >
                        {day.dayOfWeek}
                    </span>
                </th>
            )
        });
        const PersonComponent = users.map((user) => {
            let match = user.name.match(/\b(\w)/g);
            let acronym = match.join('');
            return (
                <tr key={user.id}>
                    <th className="person">
                        <div className="person_container">
                            <span className="img-circle">{acronym}
                                <span className="days-remaining">{user.remainingDays}</span>
                            </span>
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
                                            <div onClick={this.handleModalShow.bind(this, user, day)}
                                                 className={'first '
                                                 + (day.dayOfWeek !== 'S' ? 'day' : 'nwd')
                                                 + (user.holidays.find(function (value) {
                                                     return moment(value.day).format('L') ===
                                                         moment(day.date).format('L') &&
                                                         (value.half === 'first' || value.half === 'both');
                                                 }) ? ' holiday' : '')
                                                 + (user.remoteDays.find(function (value) {
                                                     return moment(value.day).format('L') ===
                                                         moment(day.date).format('L') &&
                                                         (value.half === 'first' || value.half === 'both');
                                                 }) ? ' remote' : '') +
                                                 (user.sickLeave.find(function (value) {
                                                     return moment(value.day).format('L') ===
                                                         moment(day.date).format('L') &&
                                                         (value.half === 'first' || value.half === 'both');
                                                 }) ? ' sick' : '')
                                                 + (user.unpaidLeave.find(function (value) {
                                                     return moment(value.day).format('L') ===
                                                         moment(day.date).format('L') &&
                                                         (value.half === 'first' || value.half === 'both');
                                                 }) ? ' unpaid' : '')
                                                 }>
                                                <span>{day.id}</span>
                                            </div>
                                            <div onClick={() => {
                                                this.handleModalShow(user, day)
                                            }} className={'second '
                                            + (day.dayOfWeek !== 'S' ? 'day' : 'nwd')
                                            + (user.holidays.find(function (value) {
                                                return moment(value.day).format('L') ===
                                                    moment(day.date).format('L') &&
                                                    (value.half === 'second' || value.half === 'both');
                                            }) ? ' holiday' : '')
                                            + (user.remoteDays.find(function (value) {
                                                return moment(value.day).format('L') ===
                                                    moment(day.date).format('L') &&
                                                    (value.half === 'second' || value.half === 'both');
                                            }) ? ' remote' : '')
                                            + (user.sickLeave.find(function (value) {
                                                return moment(value.day).format('L') ===
                                                    moment(day.date).format('L') &&
                                                    (value.half === 'second' || value.half === 'both');
                                            }) ? ' sick' : '')
                                            + (user.unpaidLeave.find(function (value) {
                                                return moment(value.day).format('L') ===
                                                    moment(day.date).format('L') &&
                                                    (value.half === 'second' || value.half === 'both');
                                            }) ? ' unpaid' : '')
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
        console.log('UserS', users);
        return (
            <div className="calendar-timeline">
                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center">Book time off</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className='row clearfix'>
                                <div className='col-sm-12 form-group'>
                                    <div className='clearfix'>
                                        <div className='type'>
                                            <TextField
                                                select
                                                label="Type"
                                                value={this.state.typeValue}
                                                className='menu'
                                                onChange={evt => this.updateTypeValue(evt)}
                                                SelectProps={{
                                                    MenuProps: {
                                                        className: 'menu',
                                                    },
                                                }}
                                                margin="normal"
                                            >
                                                {typeValues.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-sm-6 form-group">
                                    <div className="clearfix">
                                        <div className="date">
                                            <label htmlFor="fromDate">Starting:</label>
                                            <DatePicker
                                                id='fromDate'
                                                clearIcon={null}
                                                calendarIcon={null}
                                                onChange={this.onStartValueChange}
                                                value={this.state.datePickerStartDate}
                                            />
                                        </div>
                                        <div className="time">
                                            <TextField
                                                select
                                                label="From:"
                                                value={this.state.startingValue}
                                                className='menu'
                                                onChange={evt => this.updateStartingValue(evt)}
                                                SelectProps={{
                                                    MenuProps: {
                                                        className: 'menu',
                                                    },
                                                }}
                                                margin="normal"
                                            >
                                                {startingValues.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 form-group">
                                    <div className="clearfix">
                                        <div className="date">
                                            <label htmlFor="toDate">Ending:</label>
                                            <DatePicker
                                                id="toDate"
                                                clearIcon={null}
                                                calendarIcon={null}
                                                onChange={this.onEndValueChange}
                                                value={this.state.datePickerEndDate}
                                            />
                                        </div>
                                        <div className="time">
                                            <TextField
                                                select
                                                label="To:"
                                                value={this.state.endingValue}
                                                className='menu'
                                                onChange={evt => this.updateEndingValue(evt)}
                                                SelectProps={{
                                                    MenuProps: {
                                                        className: 'menu',
                                                    },
                                                }}
                                                margin="normal"
                                            >
                                                {endingValues.map(option => (
                                                    <MenuItem key={option.value} value={option.value}
                                                              disabled={option.value === 'lunchtime' &&
                                                              this.state.datePickerStartDate.getDate() === this.state.datePickerEndDate.getDate() &&
                                                              this.state.startingValue === 'afternoon'}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outlined" color="primary" size="large" className='pull-right'
                                onClick={this.handleModalSubmit}>Submit</Button>

                        <Button variant="outlined" color="default" size="large" className='pull-left'
                                onClick={this.handleModalClose}>Close</Button>
                        {moment(this.state.datePickerStartDate).set({'hour': 0, 'minute': 0, 'second': 0}).format('L') >=
                        moment().set({'hour': 0, 'minute': 0, 'second': 0}).format('L') ?
                            <div className='col-sm-7 text-center'>
                                <Button variant="outlined" color="secondary" size="large"
                                        onClick={this.handleModalCancel}>Cancel Holiday</Button>
                            </div> : null}
                    </Modal.Footer>
                </Modal>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <div></div>
                        </th>
                        <th className="month-pagination" colSpan={10}>
                            <a onClick={this.monthPagination.bind(this, -1)}>
                                <FontAwesomeIcon icon="arrow-left"/>
                            </a>
                            <span
                                className='text-center'>{this.state.currentDate.format('MMMM')} {this.state.currentDate.get('year')}</span>
                            <a onClick={this.monthPagination.bind(this, +1)}>
                                <FontAwesomeIcon icon="arrow-right"/>
                            </a>
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