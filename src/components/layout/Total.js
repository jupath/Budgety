import React from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import itemsSelector from '../../selectors/items';

export const Total = (props) => {
  const { numOfIncomes, numOfExpenses, total } = props;
  const incomeWord = numOfIncomes === 1 ? 'income' : 'incomes';
  const expenseWord = numOfExpenses === 1 ? 'expense' : 'expenses';
  const formedTotal = (<NumberFormat
    value={total}
    displayType="text"
    thousandSeparator
    prefix="$"
    decimalScale={2}
    fixedDecimalScale
  />);
  const renderedTotal = total >= 0 ? formedTotal : <span className="text-danger">{formedTotal}</span>;

  return (
    <h4>
      Viewing {numOfIncomes} {incomeWord} and {numOfExpenses} {expenseWord} totalling {renderedTotal}
    </h4>
  );
};

Total.propTypes = {
  numOfIncomes: PropTypes.number,
  numOfExpenses: PropTypes.number,
  total: PropTypes.number,
};

Total.defaultProps = {
  numOfIncomes: 0,
  numOfExpenses: 0,
  total: 0,
};

const mapStateToProps = state => ({
  numOfIncomes: itemsSelector(state.items, 'income', state.filters).length,
  numOfExpenses: itemsSelector(state.items, 'expense', state.filters).length,
});

export default connect(mapStateToProps)(Total);
