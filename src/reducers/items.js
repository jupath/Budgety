export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.item];
    case 'UPDATE_ITEM':
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            ...action.item,
          };
        }
        return item;
      });
    case 'DELETE_ITEM':
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};
