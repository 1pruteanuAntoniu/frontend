import React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import CalendarList from '../../components/calendarList';
import ToastMessage from '../../components/toast';
import * as api from '../../api/index';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedDates: [],
            currentDate: moment().format(),
        }
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
        const index = this.state.selectedDates.indexOf(e);
        this.state.selectedDates.splice(index, 1);
        this.setState({
            ...this.state,
            selectedDates: [...this.state.selectedDates],
        })
    }

    onSubmit = async (e) => {
        const formatedData = this.state.selectedDates.map(item => {
            return ({
                date_of_event: moment(item).format('YYYY-MM-DD'),
                description: '',
            });
        });
        const res = await api.addEvent(formatedData);
        if (res.status === 200) {
            this.setState({
                ...this.state,
                apiSuccess: true,
            })
        } else {
            this.setState({
                ...this.state,
                apiSuccess: false,
            })
        }
    }

    formatDates = () => {
        const { selectedDates } = this.state;
        return selectedDates;
    }

    render() {
        const dates = this.formatDates(this.state.selectedDates);
        const { apiSuccess } = this.state;
        return (
            <div className="calendar-container">
                {
                    apiSuccess && apiSuccess === true
                    ? <ToastMessage 
                            msg="Successfully added!"
                            type="good"
                        />
                    : apiSuccess && apiSuccess === false 
                        ?   <ToastMessage 
                                msg="There was an error!"
                                type="bad"
                            />
                        : null
                }
                
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
                    items={[...dates]}
                    title='Calendar items'
                    onClick={this.onClickDelete}
                    onSubmit={this.onSubmit}
                    disabled={dates.length === 0}
                />
            </div>
        )
    }
}