import axios from 'axios';
import NProgress from 'nprogress';
// import store from '../store';
import router from '../router';
import { Message } from 'element-ui';
import { getToken, removeToken } from '@/utils/auth';
import { encryptRsa } from '@/utils/gas.jdk';

class HttpRequest {
  constructor (baseUrl = '') {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    };
    return config;
  }
  destroy (url) {
    delete this.queue[url];
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        NProgress.start();
        const token = getToken();
        this.queue[url] = true;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        const { data } = config;
        // if (params) {
        //   // console.log(params);
        //   const str = JSON.stringify(params);
        //   config.params = encryptRsa(str);
        // }
        if (data) {
          // console.log(data);
          const str = JSON.stringify(data);
          config.data = encryptRsa(str);
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        NProgress.done();
        this.destroy(url);
        // const { data, msg } = res.data;
        // const _data = typeof data === 'object' ? this.decrypt(data) : data;
        // console.log(_data);
        return res.data;
      },
      async error => {
        NProgress.done();
        this.destroy(url);
        let { data, status } = error.response;
        if (status === 401) {
          removeToken();
          // await store.dispatch('user/logout');
          router.push(`/login`);
        }
        if (data.error && data.error.indexOf('jwt') > -1) {
          // await store.dispatch('user/logout');
          removeToken();
          router.push(`/login`);
        }
        Message.error(data.msg);
        return Promise.reject(data);
      }
    );
  }
  request (options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
