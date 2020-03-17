import React from 'react';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: ['2020 Feb 18', '2020 18 18'],
    }
  }

  onDelete = (item) => {
    this.setState({
      ...this.state,
      events: this.state.events.filter(event => event !== item),
    })
  }

  render() {
    console.log(this.state);
    return (
      <div className="calendar-container">
        <h1 className="calendar-title">Calendar History</h1>
        <div className="events-content">
          {
            this.state.events.map((item, index) => {
              return (
                <div key={index} className="event-item">
                  <p className="event-content">{item}</p>
                  <i onClick={() => this.onDelete(item)} className="fas fa-times delete-icon"></i>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}