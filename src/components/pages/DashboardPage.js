import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BudgetSummary from '../layout/BudgetSummary';
import ListFilterForm from '../forms/ListFilterForm';
import ListHeader from '../list/ListHeader';
import BudgetList from '../list/BudgetList';
import itemsSelector from '../../selectors/items';

export const DashboardPage = props => (
  <div>
    <BudgetSummary />
    <ListFilterForm />
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <ListHeader listName="Expenses" itemsType="expense" />
          {props.expenses.length > 0 && <BudgetList items={props.expenses} />}
        </div>
        <div className="col-sm-6">
          <ListHeader listName="Incomes" itemsType="income" />
          {props.incomes.length > 0 && <BudgetList items={props.incomes} />}
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  incomes: itemsSelector(state.items, 'income', state.filters),
  expenses: itemsSelector(state.items, 'expense', state.filters),
});

DashboardPage.propTypes = {
  incomes: PropTypes.arrayOf(PropTypes.object),
  expenses: PropTypes.arrayOf(PropTypes.object),
};

DashboardPage.defaultProps = {
  incomes: [],
  expenses: [],
};

export default connect(mapStateToProps)(DashboardPage);
