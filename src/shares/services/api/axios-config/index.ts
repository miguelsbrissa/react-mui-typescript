import axios from 'axios'
import { Environment } from '../../../environment'
import { errorInterceptor } from './interceptors/ErroInterceptor'
import { responseInterceptor } from './interceptors/ResponseInterceptor'

const Api = axios.create({
    baseURL: Environment.URL_BASE
})

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
)

export {Api}