import React from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import summarySelector from '../../selectors/summary';
import Total from './Total';

export const BudgetSummary = (props) => {
  const { totalIncomes, totalExpenses } = props;
  const total = totalIncomes - totalExpenses;
  return (
    <div className="budget-summary pt-4 pb-3">
      <div className="container">
        <Total total={total} />
        <h5><span className="pr-2">Total income:</span>
          <NumberFormat
            value={totalIncomes}
            displayType="text"
            thousandSeparator
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
          />
        </h5>
        <h5><span className="pr-2">Total expenses:</span>
          <NumberFormat
            value={totalExpenses}
            displayType="text"
            thousandSeparator
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
          />
        </h5>
      </div>
    </div>
  );
};

BudgetSummary.propTypes = {
  totalIncomes: PropTypes.number,
  totalExpenses: PropTypes.number,
};

BudgetSummary.defaultProps = {
  totalIncomes: 0,
  totalExpenses: 0,
};

const mapStateToProps = state => ({
  totalIncomes: summarySelector(state.items, 'income', state.filters),
  totalExpenses: summarySelector(state.items, 'expense', state.filters),
});

export default connect(mapStateToProps)(BudgetSummary);
