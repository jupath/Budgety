import moment from 'moment';
import itemsSelector from '../../selectors/items';
import items from '../fixtures/items';

test('should set default for expenses', () => {
  const filters = {
    startDate: undefined,
    endDate: undefined,
    sortBy: 'date',
  };
  const result = itemsSelector(items, 'expense', filters);
  expect(result).toEqual([ items[2], items[0] ]);
});

test('should set default for incomes', () => {
  const filters = {
    startDate: undefined,
    endDate: undefined,
    sortBy: 'date',
  };
  const result = itemsSelector(items, 'income', filters);
  expect(result).toEqual([ items[1] ]);
});

test('should filter by start date', () => {
  const filters = {
    startDate: moment(0).add(3, 'days'),
    endDate: undefined,
    sortBy: 'date',
  };
  const result = itemsSelector(items, 'expense', filters);
  expect(result).toEqual([ items[2] ]);
});

test('should filter by end date', () => {
  const filters = {
    startDate: undefined,
    endDate: moment(0).add(3, 'days'),
    sortBy: 'date',
  };
  const result = itemsSelector(items, 'expense', filters);
  expect(result).toEqual([ items[0] ]);
});

test('should filter by value', () => {
  const filters = {
    startDate: undefined,
    endDate: undefined,
    sortBy: 'value',
  };
  const result = itemsSelector(items, 'expense', filters);
  expect(result).toEqual([ items[0], items[2] ]);
});
