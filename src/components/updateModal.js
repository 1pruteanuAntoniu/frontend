import React, { useState } from 'react';

const UpdateModal = (props) => {
  const [date, setDate] = useState(props.date || '');
  const [descr, setDescr] = useState(props.descr || '');
  const [id, setId] = useState(props.id || '');
  const { onCloseUpdate, onSubmit } = props;

  const onChange = (e) => {
    if (e.target.name === 'date') {
      setDate(e.target.value);
    } else {
      setDescr(e.target.value);
    }
  }

  const onSubmitData = () => {
    onSubmit({
      date_of_event: date,
      description: descr,
      id,
    });
  }

  return (
    <div className="update-modal-container">
      <i className="fas fa-times close-icon" onClick={onCloseUpdate}></i>
      <h1>Change this event</h1>
      <label className="label" htmlFor="date">
        Date: 
        <input className="input-text" name="date" onChange={onChange} placeholder="YYYY-MM-DD" value={date}></input>
      </label>
      <label className="label">
        Description: 
        <input className="input-text" name="description" value={descr} onChange={onChange}></input>
      </label>
      <button onClick={onSubmitData} className="update-submit-btn">Submit</button>
    </div>
  );
}

export default UpdateModal;