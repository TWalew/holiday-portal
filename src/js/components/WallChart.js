import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import moment from "moment";
import DatePicker from 'react-date-picker'
import Popup from 'reactjs-popup'
import {Modal, Button} from "react-bootstrap";
import * as UserActions from '../actions/UserActions';
import LoginStore from "../stores/LoginStore";
import UserStore from "../stores/UserStore";
import '../../css/WallChart.scss';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const typeValues = [
    {
        value: 'holidays',
        label: 'Holiday'
    },
    {
        value: 'remoteDays',
        label: 'Remote'
    }
];
let typeVal = '';
const morning = 'morning';
const lunchtime = 'lunchtime';
const endOfDay = 'endOfDay';
const afternoon = 'afternoon';

export default class WallChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            typeValue: '',
            startingValue: 'morning',
            endingValue: 'endOfDay',
            currentDate: moment(new Date()),
            stopDate: moment(this.currentDate).add(1, 'month').add(-1, 'days'),
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
        this.monthPagination = this.monthPagination.bind(this);
        this.checkDaysOff = this.checkDaysOff.bind(this);
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

    checkForHalfDays(start, end, current) {
        let startVal = this.state.startingValue;
        let endVal = this.state.endingValue;
        if (start.getDate() === end.getDate()) {
            if (startVal === morning && endVal === endOfDay) {
                return 'both';
            } else if (startVal === morning && endVal === lunchtime) {
                return 'first';
            } else if (startVal === afternoon && endVal === endOfDay) {
                return 'second';
            }
        } else if (start.getDate() !== end.getDate() && start.getDate() === current.getDate()) {
            if (startVal === morning && endVal === endOfDay) {
                return 'both'
            } else if (startVal === morning && endVal === lunchtime) {
                return 'both';
            } else if (startVal === afternoon && endVal === endOfDay) {
                return 'second';
            } else if (startVal === afternoon && endVal === lunchtime) {
                return 'second'
            }
        } else if (start.getDate() !== end.getDate() && end.getDate() === current.getDate()) {
            if (startVal === morning && endVal === endOfDay) {
                return 'both'
            } else if (startVal === morning && endVal === lunchtime) {
                return 'first';
            } else if (startVal === afternoon && endVal === endOfDay) {
                return 'both';
            } else if (startVal === afternoon && endVal === lunchtime) {
                return 'first'
            }
        } else return 'both'
    }

    getDaysInMonth() {
        var dateArray = [];
        var currentDate = this.state.currentDate;
        var stopDate = this.state.stopDate;
        console.log("currentDate", currentDate);
        console.log('stopDate', stopDate);
        while (currentDate <= stopDate) {
            dateArray.push({
                id: moment(currentDate).get('date'),
                date: moment(currentDate)._d,
                dayOfWeek: moment(currentDate).toString().substring(0, 1)
            });
            currentDate = moment(currentDate).add(1, 'days');
        }
        console.log('dateArray', dateArray);
        return dateArray;
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

    checkDaysOff(user, day, array) {
        user[array].find(function (el) {
            if (moment(el.day).format('L') === moment(day.date).format('L')) {
                typeVal = [array];
            }
        });
    }

    handleModalShow(user, day) {
        this.checkDaysOff(user, day, 'holidays');
        this.checkDaysOff(user, day, 'remoteDays');
        this.setState({
            datePickerStartDate: day.date,
            datePickerEndDate: day.date,
            typeValue: typeVal,
            modalData: {
                user: user,
            },
            showModal: true,
        });
    }

    handleModalSubmit() {
        let that = this;
        let dateArr = this.getDateArray(this.state.datePickerStartDate, this.state.datePickerEndDate);
        let days = [];

        dateArr.forEach(function (value, index, array) {
            if (index === 0) {
                let half = that.checkForHalfDays(array[0], array[array.length - 1], value);
                days.push({day: value, half: half});
            } else if (index === array.length - 1) {
                let half = that.checkForHalfDays(array[0], array[array.length - 1], value);
                days.push({day: value, half: half});
            } else {
                let half = that.checkForHalfDays(array[0], array[array.length - 1], value);
                days.push({day: value, half: half})
            }
        });
        UserActions.RequestDayOff(this.state.modalData.user.id, days, this.state.typeValue);
        this.setState({
                showModal: false
            }
        );
    }

    monthPagination(direction) {
        this.setState({
            currentDate: this.state.currentDate.add(direction, 'month'),
            stopDate: this.state.stopDate.add(direction, 'month')
        });
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
            const ok = false;
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
                                            <div onClick={this.handleModalShow.bind(this, user, day)}
                                                 className={'first '
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
                                                this.handleModalShow(user, day)
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
                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center">Book time off</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className='row clearfix'>
                                <div className="col-sm-6 form-group type">
                                    <label htmlFor="typeSel">Type:</label>
                                    <select id="typeSel"
                                            name="BookType"
                                            value={this.state.typeValue}
                                            onChange={evt => this.updateTypeValue(evt)}>
                                        <option defaultValue value="holidays">Holiday</option>
                                        <option value="remoteDays">Remote</option>
                                    </select>
                                </div>
                                <div className='col-sm-6 form-group'>
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
                            <div className="row clearfix">
                                <div className="col-sm-6 form-group">
                                    <label htmlFor="fromDate">Starting:</label>
                                    <div className="clearfix">
                                        <div className="date">
                                            <DatePicker
                                                id='fromDate'
                                                clearIcon={null}
                                                calendarIcon={null}
                                                onChange={this.onStartValueChange}
                                                value={this.state.datePickerStartDate}
                                            />
                                        </div>
                                        <div className="time">
                                            <select name="Starting" value={this.state.startingValue}
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
                                                clearIcon={null}
                                                calendarIcon={null}
                                                onChange={this.onEndValueChange}
                                                value={this.state.datePickerEndDate}
                                            />
                                        </div>
                                        <div className="time">
                                            <select name="Ending" value={this.state.endingValue}
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
                        <Button className="pull-right btn-success" onClick={this.handleModalSubmit}>Submit</Button>
                        <Button className="pull-left btn-danger" onClick={this.handleModalClose}>Close</Button>
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