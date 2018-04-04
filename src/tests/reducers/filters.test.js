import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should set initial filter state', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    sortBy: 'date',
  });
});

test('should set start date state', () => {
  const action = {
    type: 'SET_START_DATE',
    startDate: moment(0),
  };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(moment(0));
});

test('should set end date state', () => {
  const action = {
    type: 'SET_END_DATE',
    endDate: moment(0),
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(moment(0));
});

test('should set sort by state', () => {
  const action = {
    type: 'SET_SORT_BY',
    sortBy: 'value',
  };
  const state = filtersReducer(undefined, action);
  expect(state.sortBy).toBe('value');
});
