import { queryForm } from '@/services/configForm';

const UserModel = {
  namespace: 'configForm',
  state: {
    formJson: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const { data } = yield call(queryForm);
      yield put({
        type: 'saveFormJson',
        payload: data,
      });
    },
  },
  reducers: {
    saveFormJson(state, action) {
      return { ...state, formJson: action.payload || {} };
    },
  },
};
export default UserModel;
