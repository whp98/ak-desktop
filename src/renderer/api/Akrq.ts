// index.ts
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:28080/api/public'
    : 'http://127.0.0.1:28080/api/public';

// 导出Request，可以用来自定义传递配置来创建实例
export class Akrq {
  // axios 实例
  instance: AxiosInstance

  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = {baseURL, "timeout": 60000}

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
    this.instance = axios.create(Object.assign(this.baseConfig, config))
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }
}

// 默认导出Request实例
export default new Akrq({})
