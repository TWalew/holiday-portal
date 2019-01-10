import React from 'react'
import Header from '../components/Header';
import moment from "moment";
import Calendar from 'react-calendar'

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <h1>HOMEPAGE</h1>
                <h2><b>TODO: CALENDAR</b></h2>

                <Calendar startDate={ moment() }
                          endDate={ moment().endOf('year') }
                          weekNumbers={true}
                          size={12}
                          mods={
                              [
                                  {
                                      date: moment(),
                                      classNames: [ 'current' ],
                                      component: [ 'day', 'month', 'week' ]
                                  }
                              ]
                          }
                />
            </div>
        );
    }
}