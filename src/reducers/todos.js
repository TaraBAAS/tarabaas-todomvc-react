import * as types from '../constants/TodoActionTypes';

export default function todos (state = {
  isLoading: false,
  items: []
}, action) {
  switch (action.type) {
    case types.FETCH_TODOS:
    case types.CREATE_TODO:
    case types.DELETE_TODO:
      return {
        ...state,
        isLoading: true
      };

    case types.COMPLETE_TODO:
      return {
        ...state,
        items: state.items.map(todo => {
          return todo._id !== action.id ? todo : {
            ...todo,
            completed: action.completed
          };
        }),
        isLoading: true
      };

    case types.EDIT_TODO:
      return {
        ...state,
        items: state.items.map(todo => {
          return todo._id !== action.id ? todo : {
            ...todo,
            text: action.text
          };
        }),
        isLoading: true
      };

    case types.FETCH_TODOS_FAILURE:
    case types.CREATE_TODO_FAILURE:
    case types.DELETE_TODO_FAILURE:
    case types.COMPLETE_TODO_FAILURE:
    case types.EDIT_TODO_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    case types.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.items
      };

    case types.CREATE_TODO_SUCCESS:
    case types.DELETE_TODO_SUCCESS:
    case types.COMPLETE_TODO_SUCCESS:
    case types.EDIT_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    // case COMPLETE_ALL:
    //   const areAllMarked = state.every(todo => todo.completed)
    //   return state.map(todo => ({
    //     ...todo,
    //     completed: !areAllMarked
    //   }))
    //
    // case CLEAR_COMPLETED:
    //   return state.filter(todo => todo.completed === false)

    default:
      return state;
  }
}
