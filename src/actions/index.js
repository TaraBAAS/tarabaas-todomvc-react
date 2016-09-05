import fetch from 'isomorphic-fetch';

import * as types from '../constants/ActionTypes';
import {PROJECT_URL} from '../settings';

function dispatchRequest (url, params) {
  return (request, response, failure) => {
    return (dispatch) => {
      return (!!params ? fetch(url, params) : fetch(url))
        .then(r => r.json())
        .then(json => dispatch(response(json)))
        .catch(failure);
    };
  };
};

export function fetchTodos () {
  const request = () => {
    return {
      type: types.FETCH_TODOS
    };
  };
  const success = (json) => {
    return {
      type: types.FETCH_TODOS_SUCCESS,
      items: json
    }
  };
  const failure = (err) => {
    return {
      type: types.FETCH_TODOS_FAILURE
    };
  };
  return dispatchRequest(`${PROJECT_URL}/todos`)(request, success, failure);
};

export function createTodo (text) {
  const request = () => {
    return {
      type: types.CREATE_TODO
    };
  };
  const success = (json) => {
    return {
      type: types.CREATE_TODO_SUCCESS,
      todo: {}
    };
  };
  const failure = () => {
    return {
      type: types.CREATE_TODO_FAILURE
    };
  };

  return dispatchRequest(`${PROJECT_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify({text})
  })(request, success, failure);
};

export function createTodoAndSync (text) {
  return (dispatch) => {
    return dispatch(createTodo(text))
      .then(() => {
        dispatch(fetchTodos());
      });
  };
};

export function deleteTodo (id) {
  const request = () => {
    return {
      type: types.DELETE_TODO
    };
  };
  const success = (json) => {
    return {
      type: types.DELETE_TODO_SUCCESS
    };
  };
  const failure = () => {
    return {
      type: types.DELETE_TODO_FAILURE
    };
  };

  return dispatchRequest(`${PROJECT_URL}/todos/${id}/`, {
    method: 'DELETE',
    mode: 'cors'
  })(request, success, failure);
};

export function deleteTodoAndSync (id) {
  return (dispatch) => {
    return dispatch(deleteTodo(id))
      .then(() => {
        dispatch(fetchTodos());
      });
  };
}

export function completeTodo (id) {};

export function editTodo (id, text) {};

// export function addTodo (text) {
//   return {
//     type: types.ADD_TODO,
//     text
//   };
// }
//
// export function deleteTodo (id) {
//   return {
//     type: types.DELETE_TODO,
//     id
//   };
// }
//
// export function editTodo (id, text) {
//   return {
//     type: types.EDIT_TODO,
//     id,
//     text
//   };
// }
//
// export function completeTodo (id) {
//   return {
//     type: types.COMPLETE_TODO,
//     id
//   };
// }
//
// export function completeAll () {
//   return {
//     type: types.COMPLETE_ALL
//   }
// }
//
// export function clearCompleted () {
//   return {
//     type: types.CLEAR_COMPLETED
//   }
// }
