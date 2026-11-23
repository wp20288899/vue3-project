/**
 * 示例业务模块：user
 * 新建模块时复制此文件，修改接口路径和类型即可。
 */
import { request } from '../request'

export interface UserInfo {
  id: number
  name: string
  email: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
  user: UserInfo
}

export function login(params: LoginParams) {
  return request<LoginResult>({ method: 'POST', url: '/auth/login', data: params })
}

export function getUserInfo() {
  return request<UserInfo>({ method: 'GET', url: '/user/info' })
}
