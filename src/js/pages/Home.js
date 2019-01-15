import React from 'react'
import moment from "moment";
import {Calendar, MonthView} from 'react-calendar'
import WallChart from "../components/WallChart";

export default class Home extends React.Component {

    render() {
        return (
            <div className="container">
                {/*<Calendar startDate={ moment() }*/}
                {/*endDate={ moment().endOf('year') }*/}
                {/*weekNumbers={true}*/}
                {/*size={12}*/}
                {/*mods={*/}
                {/*[*/}
                {/*{*/}
                {/*date: moment(),*/}
                {/*classNames: [ 'current' ],*/}
                {/*component: [ 'day', 'month', 'week' ]*/}
                {/*}*/}
                {/*]*/}
                {/*}*/}
                {/*/>*/}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*<Calendar onChange={(value) => alert('New date is: ' + value)}*/}
                {/*showNavigation={false}/>*/}
                {/*<br/>*/}
                <MonthView activeStartDate={new Date(2019, 0, 1)}
                           hover={new Date(2019, 0, 11)}
                           onClick={(value) => alert('New date is: ' + value)}
                           tileContent={({date, view}) => <p>{date.getDay()}</p>}
                />

                <WallChart/>
            </div>
        );
    }
}