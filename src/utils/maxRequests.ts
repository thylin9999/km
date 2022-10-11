/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
/*
 * @version:  ;
 * @description:  图片鉴权;
 * @autor: Full
 * @date: Do not edit
 */
import axios from 'axios';
import { Subject } from 'rxjs';
import {
    cacheAdapterEnhancer,
    throttleAdapterEnhancer,
} from 'axios-extensions'; //使用http缓存

export let subject = new Subject();

axios.defaults.timeout = 5000;
const CancelToken = axios.CancelToken;
export let source = CancelToken.source();

subject.subscribe((res: any) => {
    if (res.source) {
        source = CancelToken.source();
    }
});

// 并发请求上限
const MAX = 5;
/**
 * 封装axios并发请求数
 */
class LimitPromise {
    public _max: number;
    public _count: number;
    public _taskQueue: any[];
    constructor(max: number) {
        // 异步任务“并发”上限
        this._max = max || 6;
        // 当前正在执行的任务数量
        this._count = 0;
        // 等待执行的任务队列
        this._taskQueue = [];
    }

    /**
     * 调用器，将异步任务函数和它的参数传入
     * @param caller 异步任务函数，它必须是async函数或者返回Promise的函数
     * @param args 异步任务函数的参数列表
     * @returns {Promise<unknown>} 返回一个新的Promise
     */
    call(caller: any, ...args: any) {
        return new Promise((resolve, reject) => {
            const task = this._createTask(caller, args, resolve, reject);
            if (this._count >= this._max) {
                //   console.log('count >= max, push a task to queue', this._count , this._max, this._taskQueue)
                this._taskQueue.push(task);
            } else {
                // console.log('数组中的对列长度还没超过6个', this._count)
                task();
            }
        });
    }

    /**
     * 创建一个任务
     * @param caller 实际执行的函数
     * @param args 执行函数的参数
     * @param resolve
     * @param reject
     * @returns {Function} 返回一个任务函数
     * @private
     */
    _createTask(caller: any, args: any, resolve: any, reject: any) {
        return () => {
            // 实际上是在这里调用了异步任务，并将异步任务的返回（resolve和reject）抛给了上层
            caller(...args)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    // 任务队列的消费区，利用Promise的finally方法，在异步任务结束后，取出下一个任务执行
                    this._count--;
                    if (this._taskQueue.length) {
                        //   console.log('a task run over, pop a task to run', this._taskQueue)
                        let task = this._taskQueue.shift();
                        task();
                    } else {
                        // console.log('task count = ', count)
                    }
                });
            this._count++;
            // console.log('task run , task count = ', this._count)
        };
    }
}

// 调用核心控制器类
const limitP = new LimitPromise(MAX);

// 导出axios的几种请求方式
export const getP = (url: string, params?: any, config = {}) => {
    return limitP
        .call(axios.get, url, {
            params: params,
            ...config,
            cancelToken: source.token,
            headers: { 'Cache-Control': 'no-cache' },
            adapter: throttleAdapterEnhancer(
                // @ts-ignore
                cacheAdapterEnhancer(axios.defaults.adapter),
            ),
        })
        .then((res: any) => res.data);
};

export const postP = (url: string, params?: any, config = {}) => {
    return limitP
        .call(axios.post, url, params, {
            params: params,
            ...config,
            cancelToken: source.token,
            headers: { 'Cache-Control': 'no-cache' },
            adapter: throttleAdapterEnhancer(
                // @ts-ignore
                cacheAdapterEnhancer(axios.defaults.adapter),
            ),
        })
        .then((res: any) => res.data);
};
