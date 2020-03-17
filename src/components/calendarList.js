import React from 'react';
import moment from 'moment';

const CalendarList = (props) => {
  const { items, title, onClick, onSubmit, disabled } = props;
  return (
    <div className="calendar-list">
      <h1 className="calendar-title">{title}</h1>
      {
        items.map((item, index) => 
        <p key={index} className="calendar-list-item">
          {moment(item).format('YYYY MMMM DD')}
          <i onClick={() => onClick(item)} className="fas fa-times delete-item-icon"></i>
        </p>)
      }
      {
        disabled
        ? <button onClick={() => onSubmit(items)} disabled type="submit" className="submit-btn-disabled">Submit</button>
        : <button onClick={() => onSubmit(items)} type="submit" className="submit-btn">Submit</button>
      }
    </div>
  )
}

export default CalendarList;
