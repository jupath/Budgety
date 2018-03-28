import 'react-dates/initialize';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
      <div className="intput-form">
        {this.state.error && <p className="text-danger">{this.state.error}</p>}
        <Form onSubmit={this.onSumbit}>
          <FormGroup>
            <Label className="sr-only" for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </FormGroup>
          <FormGroup>
            <Label className="sr-only" for="amount">Amount</Label>
            <Input
              type="text"
              name="amount"
              id="amount"
              placeholder="Amount"
              value={this.state.amount}
              onChange={this.onChangeAmount}
            />
          </FormGroup>
          <SingleDatePicker
            date={this.state.date}
            onDateChange={date => this.setState({ date })}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <FormGroup>
            <Label className="sr-only" for="note">Add a note</Label>
            <Input
              type="textarea"
              name="note"
              id="note"
              placeholder="Add a note (optional)"
              className="mt-3"
              value={this.state.note}
              onChange={this.onChangeNote}
            />
          </FormGroup>
          <Button className="text-uppercase px-4 py-2" color="success">Save {this.state.itemType}</Button>
        </Form>
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
