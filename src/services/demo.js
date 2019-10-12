import request from 'umi-request';

export async function queryTree() {
  return request('/api/multiselect');
}
