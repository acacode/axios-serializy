import axios from 'axios'
import {
  deserializeRequestData,
  serializeResponseData,
} from 'http-helpers-serializy'

let errorModel = null

axios.interceptors.request.use(
  function(config) {
    const { data } = deserializeRequestData(config.model, config.data, {
      method: config.method,
      url: config.url,
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
    const { data } = serializeResponseData(
      response.config.model,
      response.data,
      {
        method: response.config.method,
        url: response.config.url,
        isError: false,
      }
    )

    response.data = data

    return response
  },
  function(error) {
    if (errorModel && error.response) {
      const { error: serializedError } = serializeResponseData(
        error.config.model,
        null,
        {
          method: error.config.method,
          url: error.config.url,
          isError: true,
          errorModel,
          error: error.response.data,
        }
      )

      error.response.data = serializedError
    }

    return Promise.reject(error)
  }
)

export function attachErrorModel(_errorModel) {
  errorModel = _errorModel
}

export default axios
