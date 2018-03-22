import moment from 'moment';

export default (items, itemsType, { startDate, endDate, sortBy }) => items.filter((item) => {
  const date = moment(item.date);
  const startDateMatch = startDate ? startDate.isSameOrBefore(date, 'day') : true;
  const endDateMatch = endDate ? endDate.isSameOrAfter(date, 'day') : true;
  const itemTypeMatch = item.itemType === itemsType;

  return startDateMatch && endDateMatch && itemTypeMatch;
}).sort((a, b) => {
  if (sortBy === 'date') {
    return a.date < b.date ? 1 : -1;
  } else if (sortBy === 'value') {
    return a.amount < b.amount ? 1 : -1;
  }
});
