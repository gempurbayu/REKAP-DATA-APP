import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IAccountInfo, IAccountLoginValues, IAccountRegisterValues, ILoginInfo } from '../models/account';
import { IPengeluaran, IPengeluaranByDate } from '../models/pengeluaran';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1500);
    response = readResponseHeader(response);
    return response;
}, (error: AxiosError<any>) => {
    const { data, status, config } = error.response!;
    console.log(error.response!);

    switch (status) {
        case 400:
            if (typeof data === 'string') {
                alert('error, ' + data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {

            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(' '+data.errors[key]);
                    }
                }
                alert(modalStateErrors.join());
            }
            break;
        case 401:
            alert('Error 401 (Unauthorized)');
            break;
        case 403:
            alert('Error 403 (Forbidden)');
            break;
        case 404:
            alert('not-found');
            break;
        case 500:
            alert(error.response?.data.message);
            break;
    }
    return Promise.reject(error);
});

const readResponseHeader = (response: AxiosResponse): AxiosResponse => {
    return response;
}

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const handleBlobResponse = (response: AxiosResponse<Blob>) => {
    console.log(response);
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    const filename = response.headers["content-disposition"]!.split('"')[1];
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}

const requests = {
    get: <T>(url: string, body?: {}) => axios.get<T>(url, body).then(responseBody),
    getFile: (url: string, body?: AxiosRequestConfig<any>) => axios.get<Blob>(url, {...body, responseType: 'blob'}).then(response => handleBlobResponse(response)),
    post: <T>(url: string, body?: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body?: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string, body?: {}) => axios.delete<T>(url, {data: body}).then(responseBody),
    postFile: <T>(url: string, body?: {}) => axios.post<T>(url, body, { headers: {"Content-Type": "multipart/form-data"} }).then(responseBody),
    putFile: <T>(url: string, body?: {}) => axios.put<T>(url, body, { headers: {"Content-Type": "multipart/form-data"} }).then(responseBody),
}

const Pengeluaran = {
    list: () => requests.get<IPengeluaran[]>('/pengeluaran'),
    create: (data:IPengeluaran) => requests.post<IPengeluaran>('/pengeluaran', data),
    listByDate: (date: string) => requests.get<IPengeluaranByDate>(`/pengeluaran/tanggal/${date}`)
}

const Account = {
    me: () => requests.post<IAccountInfo>('/me'),
    login: (user: IAccountLoginValues) => requests.post<ILoginInfo>('/login', user),
    register: (user: IAccountRegisterValues) => requests.post<ILoginInfo>('/register', user)
}

const agent = {
    Pengeluaran,
    Account
}

export default agent;