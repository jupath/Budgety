import moment from 'moment';

const filtersReducerInitialState = {
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
  sortBy: 'date',
};

export default (state = filtersReducerInitialState, action) => {
  switch (action.type) {
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      };
    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.sortBy,
      };
    default:
      return state;
  }
};
