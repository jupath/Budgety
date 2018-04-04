import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { startUpdateItem, startDeleteItem } from '../../actions/budget';
import AddItemForm from '../forms/AddItemForm';

export class EditItemPage extends Component {
  state = {
    modal: false,
  }

  onDeleteItem = () => {
    this.props.deleteItem(this.props.item.id);
    this.toggleModal();
    this.props.history.push('/');
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleUpdateItem = (item) => {
    this.props.updateItem(this.props.item.id, item);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="container mt-4 px-lg-7">
        <h2>Update {this.props.item.itemType}</h2>
        <AddItemForm handleAddItem={this.handleUpdateItem} item={this.props.item} />
        <Button className="mt-2 px-4 py-2 text-uppercase" id="toggle-modal" color="danger" onClick={this.toggleModal}>Delete</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Delete item</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" id="delete" onClick={this.onDeleteItem}>Delete</Button>{' '}
            <Button color="secondary" id="cancel" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
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
