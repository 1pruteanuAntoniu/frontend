import React, { useState } from 'react';

const DeleteModal = (props) => {

  const { onClickYes, onClickNo, onCloseDelete } = props;

  return (
    <div className="delete-modal-container">
      <i className="fas fa-times close-icon" onClick={onCloseDelete}></i>
      <h1>Delete the item?</h1>
      <div>
        <button onClick={onClickNo} className="delete-btn no-btn">No</button>
        <button onClick={onClickYes} className="delete-btn yes-btn">Yes</button>
      </div>
    </div>
  );
}

export default DeleteModal;