import React from 'react'
import moment from "moment";
import {Calendar, MonthView} from 'react-calendar'
import WallChart from "../components/WallChart";

export default class Home extends React.Component {

    render() {
        return (
            <div className="container clearfix">
                <WallChart/>
            </div>
        );
    }
}