/*
 * @Author: JerryK
 * @Date: 2021-09-18 21:32:13
 * @LastEditors: zhanghengxin ezreal.ice@icloud.com
 * @LastEditTime: 2022-09-21 00:54:33
 * @Description:
 * @FilePath: /CasaOS-UI/src/service/service.js
 */
import axios from 'axios'
import router from '@/router'
import store from '@/store'
// import { ToastProgrammatic as Toast } from 'buefy'

const axiosBaseURL1 = (process.env.NODE_ENV === "dev") ? `${document.location.protocol}//${process.env.VUE_APP_DEV_IP}:${process.env.VUE_APP_DEV_PORT}` : ``
const axiosBaseURL = (process.env.NODE_ENV === "dev") ? `` : ``

//Create a axios instance, And set timeout to 30s
const instance = axios.create({
    baseURL: axiosBaseURL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

const getLangFromBrowser = () => {
    var lang = navigator.language || navigator.userLanguage;
    lang = lang.toLowerCase().replace("-", "_");
    return lang
}

const getInitLang = () => {
    let lang = localStorage.getItem('lang') || getLangFromBrowser()
    return lang
}


// Interception before request initiation
instance.interceptors.request.use(
    (config) => {
        config.headers.common["Language"] = getInitLang()
        const token = localStorage.getItem("access_token")
        const rtoken = localStorage.getItem("refresh_token")
        if (token) {
            config.headers.Authorization = token
            store.commit("SET_ACCESS_TOKEN", token);
            store.commit("SET_REFRESH_TOKEN", rtoken);
        }
        return config;
    }, (error) => {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Response interception

let isRefreshing = false
let requests = []

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error?.config;
        if (originalConfig.url !== "/users/register" && error.response) {
            // Access Token was expired
            if (error?.response?.status === 401) {
                if (!isRefreshing) {
                    isRefreshing = true
                    try {
                        const refresh_token = localStorage.getItem("refresh_token")
                        if (refresh_token) {
                            try {
                                const tokenRes = await instance.post("/users/refresh", {
                                    refresh_token: refresh_token,
                                });
                                if (tokenRes.data.success == 200) {
                                    localStorage.setItem("access_token", tokenRes.data.data.access_token);
                                    localStorage.setItem("refresh_token", tokenRes.data.data.refresh_token);
                                    localStorage.setItem("expires_at", tokenRes.data.data.expires_at);

                                    store.commit("SET_ACCESS_TOKEN", tokenRes.data.data.access_token);
                                    store.commit("SET_REFRESH_TOKEN", tokenRes.data.data.refresh_token);

                                    originalConfig.headers.Authorization = tokenRes.data.data.access_token
                                    Promise.resolve().then(() => {
                                        requests.forEach(cb => cb())
                                        requests = []
                                    })
                                } else {
                                    router.replace({ //Jump to the logout page
                                        path: '/logout'
                                    })
                                }
                            } catch (error) {
                                router.replace({ //Jump to the logout page
                                    path: '/logout'
                                })
                            }

                        } else {
                            router.replace({ //Jump to the login page
                                path: '/login'
                            })
                        }
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                    isRefreshing = false

                }
                return new Promise(resolve => {
                    requests.push(() => {
                        resolve(instance(originalConfig))
                    })
                })

            }
        }
        return Promise.reject(error)

    }
)

const testVisionNum = (prefix) => {
    // default version number is /v1
    if (/^http/.test(prefix)) {
        return prefix
    }
    return /^\/v2/.test(prefix) ? `${prefix}` : `/v1${prefix}`
}

const CancelToken = axios.CancelToken;
// Wrapping of axios by request type
const api = {

    get(url, data, _this) {
        url = testVisionNum(url)
        if (_this) {
            return instance.get(url, {
                params: data,
                cancelToken: new CancelToken(function executor(c) {
                    _this.cancelRequest = c
                })
            })
        } else {
            return instance.get(url, {
                params: data
            })
        }

    },
    post(url, data) {
        url = testVisionNum(url)
        return instance.post(url, data)
    },
    put(url, data) {
        url = testVisionNum(url)
        return instance.put(url, data)
    },
    delete(url, data) {
        url = testVisionNum(url)
        return instance.delete(url, {data: data})
    },
}
export {api}
