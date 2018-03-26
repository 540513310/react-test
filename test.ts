import { initAction } from '../../util/action';
import { initApi, ApiConfig } from '../../util/api';
import { handleActions } from 'redux-actions';
import { makeListHandleActions, ListState } from '../../util/listReducers';

let modelName = 'test';

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

export interface TestState extends ListState<any> {
  loading: boolean;
  name: string;
};
const listHandle = makeListHandleActions(apiActionNames.getName);

export const reducer = handleActions<TestState, any>({
  ...listHandle.handleActions,
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
  ...listHandle.initializeState,  
  loading: false,
  name: '',
});
