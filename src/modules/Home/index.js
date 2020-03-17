import React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import CalendarList from '../../components/calendarList';
import * as api from '../../api/index';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDates: ['2020-03-26T00:00:00+02:00'],
        }
    }

    componentDidMount() {
        api.getData();
    }

    selectEvent = async (e) => {
        if (this.state.selectedDates.includes(moment(e).format())) {
            const index = this.state.selectedDates.indexOf(moment(e).format());
            this.state.selectedDates.splice(index, 1)
        } else {
            await this.setState({
                ...this.state,
                selectedDates: [...this.state.selectedDates, moment(e).format()],
            });
        }

    }

    customizeDays = (e) => {
        if (this.state.selectedDates.includes(moment(e.date).format())) {
            return 'selected-day';
        }
    }

    onClickDelete = (e) => {
        console.log(e);
        const index = this.state.selectedDates.indexOf(e);
        this.state.selectedDates.splice(index, 1);
        this.setState({
            ...this.state,
            selectedDates: [...this.state.selectedDates],
        })
    }

    onSubmit = (e) => {
        console.log(e);
    }

    render() {
        console.log(this.state);
        const { selectedDates } = this.state;  
        return (
            <div className="calendar-container">
                <h1 className="calendar-title">Book your time-off now!</h1>
                <Calendar
                    calendarType="ISO 8601"
                    selectable={true}
                    dayPropGetter={this.customDayPropGetter}
                    onChange={this.selectEvent}
                    tileClassName={this.customizeDays}
                    defaultValue={new Date()}
                    defaultView={'month'}
                />
                <CalendarList 
                    items={[...selectedDates]}
                    title='Calendar items'
                    onClick={this.onClickDelete}
                    onSubmit={this.onSubmit}
                    disabled={selectedDates.length === 0}
                />
            </div>
        )
    }
}