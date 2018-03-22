import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListHeader = props => (
  <div className="list__header">
    <div>
      <h4>{props.listName}</h4>
    </div>
    <div>
      <Link className="btn btn-info" to={`/add/${props.itemsType}`}>Add new {props.itemsType}</Link>
    </div>
  </div>
);

ListHeader.propTypes = {
  itemsType: PropTypes.string.isRequired,
  listName: PropTypes.string.isRequired,
};

export default ListHeader;