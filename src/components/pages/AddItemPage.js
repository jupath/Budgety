import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startAddItem } from '../../actions/budget';
import AddItemForm from '../forms/AddItemForm';

export class AddItemPage extends Component {
  state = {
    itemTypeState: undefined,
  };

  componentWillMount() {
    this.checkUrlParams();
  }

  checkUrlParams = () => {
    const { itemType } = this.props;
    if (itemType === 'income') {
      this.setState({ itemTypeState: 'income' });
    } else if (itemType === 'expense') {
      this.setState({ itemTypeState: 'expense' });
    } else {
      this.props.history.push('/');
    }
  };

  handleAddItem = (item) => {
    this.props.addItem(item);
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="container px-lg-7">
        <h2 className="pt-4">Add new {this.state.itemTypeState}</h2>
        <AddItemForm handleAddItem={this.handleAddItem} itemType={this.state.itemTypeState} />
      </div>
    );
  }
}

AddItemPage.propTypes = {
  addItem: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  itemType: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  itemType: props.match.params.type,
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(startAddItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItemPage);
