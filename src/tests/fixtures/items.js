import moment from 'moment';

export default [
  {
    id: 'abc123',
    amount: 3100,
    date: 0,
    description: 'Test description 1',
    itemType: 'expense',
    note: ''
  },
  {
    id: 'bcd234',
    amount: 5000.52,
    date: moment(0).subtract(4, 'days').valueOf(),
    description: 'Test description 2',
    itemType: 'income',
    note: 'Salery'
  },
  {
    id: 'def345',
    amount: 2000,
    date: moment(0).add(4, 'days').valueOf(),
    description: 'Test description 3',
    itemType: 'expense',
    note: 'Dine out'
  },
];