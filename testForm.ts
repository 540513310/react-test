import { initAction } from '../../util/action';
import { initApi, ApiConfig } from '../../util/api';
import { handleActions } from 'redux-actions';

let modelName = 'testForm2';

// simple actions

export let keys = {
  changeName: 'changeName',
};

const simpleActions = initAction<typeof keys>(keys, modelName);

export const actionNames = simpleActions.actionNames;
export const actions = simpleActions.actions;

// apis

export let apis = {
  getName: 'getName',
};

let apiConfigs: ApiConfig[] = [{
  path: '/system/getName',
  actionName: apis.getName,
}];

const api = initApi<typeof apis>('', apiConfigs, modelName);

export const apiActionNames = api.apiActionNames;
export const apiActions = api.apiActions;
export const sagas = api.sagas;

// reducers

export interface TestForm2State {
  loading: boolean;
  name: string;
};

export const reducer = handleActions<TestForm2State, any>({
  [apiActionNames.getName.request](state, action) {
    return {
      ...state,
      loading: true,
    };
  },
  [apiActionNames.getName.success](state, action) {
    return {
      ...state,
      loading: false,
      name: action.payload.res.name,
    };
  },
  [apiActionNames.getName.error](state, action) {
    return {
      ...state,
      loading: false,
      name: '',
    };
  },
  [actionNames.changeName](state, action) {
    return {
      ...state,
      name: action.payload.name,
    };
  },
}, {
  loading: false,
  name: '',
});
