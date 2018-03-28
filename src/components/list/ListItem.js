import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const ListItem = props => (
  <div className="listitem">
    <Link to={`/edit/${props.listItem.id}`}>
      <div className="listitem__body py-3 px-2">
        <div>
          {props.listItem.description}<br />
          <small>{moment(props.listItem.date).format('MMMM Do, YYYY')}</small>
        </div>
        <div>
          <NumberFormat
            value={props.listItem.amount}
            displayType="text"
            thousandSeparator
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
          />
        </div>
      </div>
    </Link>
  </div>
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
