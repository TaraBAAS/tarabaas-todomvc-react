import * as tarabaas from 'tarabaas-js';
import { DATABASE_NAME } from '../constants/common';
import getProjectSchema from '../schema/project';
import getTodosSchema from '../schema/todos';

const api = tarabaas.init();

export function getOrCreateProject (projectId) {
  const projects = api.projects();

  return new Promise((resolve, reject) => !!projectId ? resolve(projectId) : reject())
  .then(id => projects.get(id).commit())
  .catch(err => projects.create(getProjectSchema()).commit());
};

export function getOrCreateDB ({uuid}) {
  const db = api.projects().get(uuid).databases();

  return db.get(DATABASE_NAME).commit()
    .catch(err => db.create(getTodosSchema()).commit());
};
