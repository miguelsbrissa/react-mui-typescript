import axios from 'axios'
import { Environment } from '../../../environment'
import { errorInterceptor } from './interceptors/ErroInterceptor'
import { responseInterceptor } from './interceptors/ResponseInterceptor'

const Api = axios.create({
    baseURL: Environment.URL_BASE,
    headers:{
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN') || '')}`,
    }
})

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
)

export {Api}