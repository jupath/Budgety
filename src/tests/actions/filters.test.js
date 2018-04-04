import moment from 'moment';
import {
  setStartDate,
  setEndDate,
  setSortBy
} from '../../actions/filters';

test('should create setStartDate object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0),
  });
});

test('should create setEndDate object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0),
  });
});

test('should create setSortBy object', () => {
  const action = setSortBy('value');
  expect(action).toEqual({
    type: 'SET_SORT_BY',
    sortBy: 'value',
  });
});
