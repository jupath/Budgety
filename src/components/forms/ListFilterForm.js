import 'react-dates/initialize';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { setStartDate, setEndDate, setSortBy } from '../../actions/filters';

class ListFilter extends Component {
  state = {
    focusedInput: null,
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.startDateDispatch(startDate);
    this.props.endDateDispatch(endDate);
  }

  onSortByChange = (event) => {
    const { value } = event.target;
    this.props.sortByDispatch(value);
  }

  render() {
    return (
      <div>
        <div className="container">
          <select
            value={this.props.filters.sortBy}
            onChange={this.onSortByChange}
          >
            <option value="date">Date</option>
            <option value="value">Value</option>
          </select>
          <DateRangePicker
            startDate={this.props.filters.startDate}
            startDateId="start-date"
            endDate={this.props.filters.endDate}
            endDateId="end-date"
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
            numberOfMonths={1}
            isOutsideRange={() => false}
            showClearDates
          />
        </div>
      </div>
    );
  }
}

ListFilter.propTypes = {
  filters: PropTypes.objectOf(PropTypes.any).isRequired,
  startDateDispatch: PropTypes.func.isRequired,
  endDateDispatch: PropTypes.func.isRequired,
  sortByDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
  startDateDispatch: startDate => dispatch(setStartDate(startDate)),
  endDateDispatch: endDate => dispatch(setEndDate(endDate)),
  sortByDispatch: sortBy => dispatch(setSortBy(sortBy)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListFilter);
