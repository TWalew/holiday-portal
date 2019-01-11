import React from 'react';

export default class WallChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear()
        };
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
    }

    getDaysInMonth(month, year) {
        let date = new Date(year, month, 1);
        let days = [];
        console.log('month', month, 'date.getMonth()', date.getMonth());
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    render() {
        console.log(this.state.currentMonth);
        console.log(this.getDaysInMonth(this.state.currentMonth, this.state.getFullYear));
        return (
            <div>
                <h1>WALLCHART</h1>
            </div>
        )
    }

}