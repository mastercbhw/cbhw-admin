import { queryTree } from '@/services/demo';

const GlobalModel = {
  namespace: 'demo',
  state: {
    tree: [],
  },
  effects: {
    *fetchTree(_, { call, put }) {
      const data = yield call(queryTree);
      yield put({
        type: 'saveTree',
        payload: data,
      });
    },
  },
  reducers: {
    saveTree(state, { payload }) {
      return {
        ...state,
        tree: payload,
      };
    },
  },
};
export default GlobalModel;
