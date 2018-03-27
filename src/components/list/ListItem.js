import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListItem = props => (
  <Link to={`/edit/${props.listItem.id}`}>
    <div className="list__item">
      <div>
        {props.listItem.description}<br />
        {moment(props.listItem.date).format('MMMM Do, YYYY')}
      </div>
      <div>
        {props.listItem.amount}
      </div>
    </div>
  </Link>
);

ListItem.propTypes = {
  listItem: PropTypes.shape({
    itemType: PropTypes.string,
    description: PropTypes.string,
    amount: PropTypes.number,
    date: PropTypes.number,
    note: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default ListItem;
