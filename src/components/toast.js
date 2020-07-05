import React from 'react';

const ToastMessage = (props) => {
  const { msg, type } = props;

  return (
    <div className={`toast-container ${type}`}>
      <p>{msg}</p>
    </div>
  );
}

export default ToastMessage;