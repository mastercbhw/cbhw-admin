import { fetchCurrent } from '@/services/user';
import router from 'umi/router';


export default {
  namespace: 'user',

  state: {
    currentUser: null,
  },

  effects: {
    * login({ payload }, { call, put }) {
      const response = yield call(fetchCurrent, payload.params)
      console.log("TCL: *login -> response", response)
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      if (response && response.status === 'ok') {
        router.push('/')
      }
    }
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  }
}
