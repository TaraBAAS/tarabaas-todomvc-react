import fetch from 'isomorphic-fetch';

import * as types from '../constants/ActionTypes';
import {PROJECT_URL} from '../settings';

export function fetchAll () {
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
  const failure = (error) => {
    return {
      error,
      type: types.FETCH_TODOS_FAILURE
    };
  };
  return (dispatch) => {
    dispatch(request());
    return fetch(`${PROJECT_URL}/todos`)
      .then(r => r.json())
      .then(json => dispatch(success(json)))
      .catch(error => dispatch(failure(error)));
  };
};

function fetchAfter (f) {
  return (...args) => {
    return (dispatch) => {
      return dispatch(f(...args))
        .then(() => {
          dispatch(fetchAll());
        });
    };
  }
}

export const createTodo = fetchAfter(text => {
  const request = () => {
    return {
      type: types.CREATE_TODO
    };
  };
  const success = (json) => {
    return {
      type: types.CREATE_TODO_SUCCESS
    };
  };
  const failure = (error) => {
    return {
      error,
      type: types.CREATE_TODO_FAILURE
    };
  };

  return (dispatch) => {
    dispatch(request());
    return fetch(`${PROJECT_URL}/todos`, {
        method: 'POST',
        body: JSON.stringify({text})
      })
      .then(r => r.json())
      .then(json => dispatch(success(json)))
      .catch(error => dispatch(failure(error)));
  };
});

export const deleteTodo = fetchAfter(id => {
  const request = () => {
    return {
      type: types.DELETE_TODO
    };
  };
  const success = () => {
    return {
      type: types.DELETE_TODO_SUCCESS
    };
  };
  const failure = (error) => {
    return {
      error,
      type: types.DELETE_TODO_FAILURE
    };
  };

  return (dispatch) => {
    dispatch(request());
    return fetch(`${PROJECT_URL}/todos/${id}/`, {
        method: 'DELETE',
        mode: 'cors'
      })
      .then(() => dispatch(success()))
      .catch(error => dispatch(failure(error)));
  };
});

export const completeTodo = fetchAfter((id, completed) => {
  const request = () => {
    return {
      id,
      completed,
      type: types.COMPLETE_TODO
    };
  };
  const success = (json) => {
    return {
      type: types.COMPLETE_TODO_SUCCESS
    };
  };
  const failure = (error) => {
    return {
      error,
      type: types.COMPLETE_TODO_FAILURE
    };
  };

  return (dispatch) => {
    dispatch(request());
    return fetch(`${PROJECT_URL}/todos/${id}/`, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify({completed})
      })
      .then(r => r.json())
      .then(json => dispatch(success(json)))
      .catch(error => dispatch(failure(error)));
  };
});

export const editTodo = fetchAfter((id, text) => {
  const request = () => {
    return {
      id,
      text,
      type: types.EDIT_TODO
    };
  };
  const success = (json) => {
    return {
      type: types.EDIT_TODO_SUCCESS,
      todo: json
    };
  };
  const failure = (error) => {
    return {
      error,
      type: types.EDIT_TODO_FAILURE
    };
  };

  return (dispatch) => {
    dispatch(request());
    return fetch(`${PROJECT_URL}/todos/${id}/`, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify({text})
      })
      .then(r => r.json())
      .then(json => dispatch(success(json)))
      .catch(error => dispatch(failure(error)));
  };
});
