// index.ts
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import axios from 'axios';

// 导出Request，可以用来自定义传递配置来创建实例
export class Akrq {
  // 基础配置，url和超时时间
  private baseConfig: AxiosRequestConfig = {
    "baseURL": 'http://127.0.0.1:38080/api/public',
    "timeout": 60000,
  };

  // axios 实例
  private instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
    this.instance = axios.create(Object.assign(this.baseConfig, config));
  }

  public changeBaseUrl(ip: string, port: string): void {
    this.baseConfig.baseURL = `http://${ip}:${port}/api/public`;
    this.instance = axios.create(this.baseConfig);
  }

  // 定义请求方法
  public get(url, config = {}): Promise<AxiosResponse> {
    return this.instance.get(url, config);
  }
}
// 默认导出Request实例
export default new Akrq({})
