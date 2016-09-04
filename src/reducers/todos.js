import {
  FETCH_TODOS, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE
} from '../constants/ActionTypes'

export default function todos (state = {
  isLoading: false,
  items: []
}, action) {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.items
      };

    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    // case ADD_TODO:
    //   return [
    //     {
    //       id: action._id,
    //       completed: false,
    //       text: action.text
    //     },
    //     ...state
    //   ]

    // case DELETE_TODO:
    //   return state.filter(todo =>
    //     todo.id !== action.id
    //   )
    //
    // case EDIT_TODO:
    //   return state.map(todo =>
    //     todo.id === action.id ?
    //       { ...todo, text: action.text } :
    //       todo
    //   )
    //
    // case COMPLETE_TODO:
    //   return state.map(todo =>
    //     todo.id === action.id ?
    //       { ...todo, completed: !todo.completed } :
    //       todo
    //   )
    //
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
