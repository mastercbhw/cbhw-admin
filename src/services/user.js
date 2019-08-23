import request from '@/utils/request'
import { message } from 'antd'

export async function fetchCurrent(params) {
  return request.post('/api/user/login', { data: params, errorHandler: () => {
    message.error('用户名或密码错误')
  } })
}
