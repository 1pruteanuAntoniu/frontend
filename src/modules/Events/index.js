import React from 'react';
import * as api from '../../api/index';
import moment from 'moment';
import UpdateModal from '../../components/updateModal';
import ToastMessage from '../../components/toast';
import DeleteModal from '../../components/deleteModal';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: ['2020 Feb 18', '2020 18 18'],
      formatedEvents: [],
      openUpdate: false,
      openDelete: false,
      modalData: {},
    }
  }

  formatData = (data) => {
    return data.map(item => {
      return ({
        date: moment(item.date_of_event).format('YYYY-MM-DD'),
        description: item.description, 
        id: item.id,
      })
    });
  }

  async componentDidMount() {
    const res = await api.getData();
    const formatedData = this.formatData(res.data);
    this.setState({
      events: res.data,
      formatedEvents: formatedData,
    });
  }

  onDelete = (item) => {
    this.setState({
      ...this.state,
      openDelete: !this.state.openDelete,
      modalData: item,
    })
  }

  onUpdate = (item) => {
    this.setState({
      ...this.state,
      openUpdate: !this.state.openUpdate,
      modalData: item,
    })
  }

  onSubmitUpdateModal = async (data) => {
    const res = await api.updateEvent(data.id, data);
    this.setState({
      ...this.state,
      openUpdate: !this.state.openUpdate,
    })
    if (res.status === 200) {
      this.setState({
        ...this.state,
        successUpdate: true,
      })
    } else {
      this.setState({
        ...this.state,
        successUpdate: false,
      })
    }
  }

  deleteItem = async () => {
    const res = await api.deleteEvent(this.state.modalData);
    if (res.status === 200) {
      this.setState({
        ...this.state,
        successDelete: true,
        openDelete: !this.state.openDelete,
      });
    } else {
      this.setState({
        ...this.state,
        successDelete: false,
        openDelete: !this.state.openDelete,
      })
    }
  }

  render() {
    const { openUpdate, openDelete, modalData, successUpdate, successDelete } = this.state;
    
    return (
      <div className="calendar-container">
         {
            successUpdate && successUpdate === true
            ? <ToastMessage 
                msg="Successfully updated!"
                type="good"
              />
            : successUpdate && successUpdate === false 
              ?   <ToastMessage 
                    msg="There was an error!"
                    type="bad"
                  />
              : null
        }
        {
            successDelete && successDelete === true
            ? <ToastMessage 
                msg="Successfully deleted!"
                type="good"
              />
            : successDelete && successDelete === false 
              ?   <ToastMessage 
                    msg="There was an error!"
                    type="bad"
                  />
              : null
        }
        {
          openUpdate
          ? <UpdateModal
              onCloseUpdate={this.onUpdate}
              date={modalData.date}
              onSubmit={this.onSubmitUpdateModal}
              descr={modalData.description}
              id={modalData.id}
            />
          : null
        }
        {
          openDelete
          ? <DeleteModal
              onCloseDelete={this.onDelete}
              onClickYes={this.deleteItem}
              onClickNo={this.onDelete}
            />
          : null
        }
        <h1 className="calendar-title">Calendar History</h1>
        <div className="events-content">
          {
            this.state.formatedEvents.map((item, index) => {
              return (
                <div key={index} className="event-item">
                  <p className="event-content">{item.date}</p>
                  <p className="event-content">{item.description ? item.description : 'No description'}</p>
                  <i onClick={() => this.onDelete(item)} className="fas fa-times delete-icon icon"></i>
                  <i onClick={() => this.onUpdate(item)} className="fas fa-edit icon"></i>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}