import { initAction } from '../../util/action';
import { initApi, ApiConfig } from '../../util/api';
import { handleActions } from 'redux-actions';

let modelName = 'testForm';

// simple actions

export let keys = {
  changeName: 'changeName',
  setValues: 'setValues'
};

const simpleActions = initAction<typeof keys>(keys, modelName);

export const actionNames = simpleActions.actionNames;
export const actions = simpleActions.actions;

// apis

export let apis = {
  login: 'login',
  getRoleList: 'getRoleList'
};

let apiConfigs: ApiConfig[] = [{
  path: '/system/login',
  actionName: apis.login,
},{
  path: '/role/getRoleList',
  actionName: apis.getRoleList,
}];

const api = initApi<typeof apis>('/business', apiConfigs, modelName);

export const apiActionNames = api.apiActionNames;
export const apiActions = api.apiActions;
export const sagas = api.sagas;

// reducers

export interface TestFormState {
    loading: boolean;
    groupName: string;
    groupOldName: string;
    groupNewName: string;
    operatorId: number;
    name: string;
    age: number;
};

export const reducer = handleActions<TestFormState, any>({
  [apiActionNames.login.request](state, action) {
    return {
      ...state,
      loading: true,
    };
  },
  [apiActionNames.login.success](state, action) {
    console.log('action.payload',action.payload);
    return {
      ...state,
      loading: false,
      operatorId: action.payload.res.operatorId,
    };
  },
  [apiActionNames.login.error](state, action) {
    return {
      ...state,
      loading: false,
      name: '',
    };
  },
  [apiActionNames.getRoleList.success](state, action) {
    console.log('action.payload',action.payload);    
    return {
      ...state,
      name: `${action.payload.res.pageMax}`,
      age: action.payload.res.totalNum,
    };
  },
  [actionNames.setValues](state, action) {
    return {
      ...state,
      ...action.payload,
      // phone: action.payload.phone
    };
  },
}, {
  loading: false,
  operatorId: 0,
  groupName: undefined,
  groupOldName: undefined,
  groupNewName: undefined,
  name: undefined,
  age: undefined
});
