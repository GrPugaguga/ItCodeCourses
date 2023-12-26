import axios, { ResponseType } from "axios";




export interface IRequest {
    url: string,
    method?: string,
    responseType?: ResponseType,
    headers?: any,
    params?: any,
    data?: any,
    paramsSerializer?: (params: object | string) => string
}


const makeRequest = ({ url = '/', method = 'get', headers, params, data, responseType = "json", paramsSerializer }: IRequest) => {
    return axios({
        url,
        method,
        responseType,
        headers: { ...headers },
        params,
        data,
        paramsSerializer
    })
}

export default makeRequest