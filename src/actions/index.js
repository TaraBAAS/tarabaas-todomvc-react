import fetch from 'isomorphic-fetch';
import * as tarabaas from 'tarabaas-js';

import * as types from '../constants/ActionTypes';
import { LS_PROJECT_ID_KEY } from '../constants/common';

export const BASE_URL = 'https://tarabaas.com/api/clients/projects';

function getProjectUrl () {
  let projectId = window.localStorage.getItem(LS_PROJECT_ID_KEY);
  return `${BASE_URL}/${projectId}/databases`;
}

const api = tarabaas.init({
  serverURL: 'https://tarabaas.com'
});

export function init () {

  return (dispatch) => {
    dispatch({type: types.INIT});

    return new Promise((resolve, reject) => {
      // проверям установлен ли project uuid
      let projectId = window.localStorage.getItem(LS_PROJECT_ID_KEY);
      if (projectId) {
        resolve(projectId)
      } else {
        reject();
      }
    })
    .then(projectId => {
      //  ключ есть, проверям есть ли проект с таким ключом
      return api
        .projects()
        .get(projectId)
        .commit();
    })
    .catch((err) => {
      // проекта нет, или ошибка, значит создаём его
      return api
        .projects()
        .create({
          name: `Todos-${Date.now()}`
        })
        .commit()
    })
    .then(json => {
      // создали проект и сохранили его uuid
      window.localStorage.setItem(LS_PROJECT_ID_KEY, json.uuid);
      return json;
    })
    .then(json => {
      // проверям, есть ли база у проекта
      return api
        .projects()
        .get(json.uuid)
        .databases()
        .get('todos')
        .commit()
        .catch(err => {
          // такой базы нет, значит создаём её
          return api
            .projects()
            .get(json.uuid)
            .databases()
            .create({
              name: 'todos',
              schema_fields: [{
                  type: 'string',
                  name: 'text'
                }, {
                  type: 'boolean',
                  name: 'completed',
                  "default": false
                }
              ]
            })
            .commit();
        });
    })
    .then(json => {
      console.log('==>', json);
      dispatch(fetchAll());
    });
  };

};

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
    return fetch(`${getProjectUrl()}/todos`)
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
    return fetch(`${getProjectUrl()}/todos`, {
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
    return fetch(`${getProjectUrl()}/todos/${id}/`, {
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
    return fetch(`${getProjectUrl()}/todos/${id}/`, {
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
    return fetch(`${getProjectUrl()}/todos/${id}/`, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify({text})
      })
      .then(r => r.json())
      .then(json => dispatch(success(json)))
      .catch(error => dispatch(failure(error)));
  };
});
