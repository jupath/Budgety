import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

export const BudgetList = props => (
  <div>
    {
      props.items.map(item => <ListItem key={item.id} listItem={item} />)
    }
  </div>
);

BudgetList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BudgetList;
