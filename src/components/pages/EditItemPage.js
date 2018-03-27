import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startUpdateItem, startDeleteItem } from '../../actions/budget';
import AddItemForm from '../forms/AddItemForm';

class EditItemPage extends Component {
  onDeleteItem = () => {
    this.props.deleteItem(this.props.item.id);
    this.props.history.push('/');
  };

  handleUpdateItem = (item) => {
    this.props.updateItem(this.props.item.id, item);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h2>Update {this.props.item.itemType}</h2>
        <AddItemForm handleAddItem={this.handleUpdateItem} item={this.props.item} />
        <button onClick={this.onDeleteItem}>Delete</button>
      </div>
    );
  }
}

EditItemPage.propTypes = {
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  item: state.items.find(item => item.id === props.match.params.id),
});

const mapDispatchToState = dispatch => ({
  updateItem: (id, item) => dispatch(startUpdateItem(id, item)),
  deleteItem: id => dispatch(startDeleteItem(id)),
});

export default connect(mapStateToProps, mapDispatchToState)(EditItemPage);
