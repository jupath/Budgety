import moment from 'moment';

export default (items, itemType, { startDate, endDate }) => items.filter((item) => {
  const date = moment(item.date);
  const startDateMatch = startDate ? startDate.isSameOrBefore(date, 'day') : true;
  const endDateMatch = endDate ? endDate.isSameOrAfter(date, 'day') : true;
  const itemTypeMatch = item.itemType === itemType;

  return startDateMatch && endDateMatch && itemTypeMatch;
})
  .map(item => item.amount)
  .reduce((a, b) => a + b, 0);
