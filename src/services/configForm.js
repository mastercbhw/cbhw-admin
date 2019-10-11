import request from 'umi-request';

export async function queryForm() {
  return request('/api/getFormJson/simple');
}
