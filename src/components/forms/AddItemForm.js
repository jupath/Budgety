import 'react-dates/initialize';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

class AddItemForm extends Component {
  state = {
    error: false,
    itemType: this.props.item.itemType || this.props.itemType,
    description: this.props.item.description || '',
    amount: this.props.item.amount || '',
    date: moment(this.props.item.date) || moment(),
    note: this.props.item.note || '',
    focused: false,
  };

  onChangeDescription = (event) => {
    const description = event.target.value;
    this.setState({
      description,
    });
  }

  onChangeAmount = (event) => {
    const amount = event.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({
        amount,
      });
    }
  }

  onChangeNote = (event) => {
    const note = event.target.value;
    this.setState({
      note,
    });
  }

  onSumbit = (event) => {
    event.preventDefault();
    if (this.state.description === '' || this.state.amount === '') {
      this.setState({
        error: 'Please provide description and amount.',
      });
    } else {
      this.setState({
        error: false,
      });
      this.props.handleAddItem({
        itemType: this.state.itemType,
        description: this.state.description,
        amount: parseFloat(this.state.amount),
        date: this.state.date.valueOf(),
        note: this.state.note,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSumbit}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.onChangeDescription}
          />
          <input
            type="text"
            name="amount"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onChangeAmount}
          />
          <SingleDatePicker
            date={this.state.date}
            onDateChange={date => this.setState({ date })}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note (optional)"
            value={this.state.note}
            onChange={this.onChangeNote}
          />
          <button>Save</button>
        </form>
      </div>
    );
  }
}

AddItemForm.propTypes = {
  itemType: PropTypes.string,
  handleAddItem: PropTypes.func.isRequired,
  item: PropTypes.objectOf(PropTypes.any),
};

AddItemForm.defaultProps = {
  itemType: '',
  item: {},
};

export default AddItemForm;
