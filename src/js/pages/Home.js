import React from 'react'
import moment from "moment";
import {Calendar, MonthView} from 'react-calendar'
import WallChart from "../components/WallChart";

export default class Home extends React.Component {

    render() {
        return (
            <div className="container">
                {/*<MonthView activeStartDate={new Date(2019, 0, 1)}*/}
                           {/*hover={new Date(2019, 0, 11)}*/}
                           {/*onClick={(value) => alert('New date is: ' + value)}*/}
                           {/*tileContent={({date, view}) => <p>{date.getDay()}</p>}*/}
                {/*/>*/}

                <WallChart/>
            </div>
        );
    }
}