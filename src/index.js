import axios from 'axios'
import {
  deserializeRequestData,
  serializeResponseData,
} from 'http-helpers-serializy'

let errorModel = null

axios.interceptors.request.use(
  function(config) {
    const { data } = deserializeRequestData(config.model, options.data, {
      method,
      url,
    })

    config.data = data

    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    const { data } = serializeResponseData(options.model, response.data, {
      method,
      url,
      isError: false,
    })

    response.data = data

    return response
  },
  function(error) {
    return Promise.reject(
      errorModel
        ? serializeResponseData(options.model, response.data, {
            method,
            url,
            isError: true,
            errorModel,
            error,
          })
        : error
    )
  }
)

export function attackErrorModel(_errorModel) {
  errorModel = _errorModel
}

export default axios
