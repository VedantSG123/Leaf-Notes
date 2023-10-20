import { useState } from "react"
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"

interface UseAxiosOptions {
  url: string
  method: "get" | "post" | "put" | "delete" | "patch"
  body?: any
  headers?: AxiosRequestConfig["headers"]
  after: (res: AxiosResponse | null, error: string | null) => void
}

const useButtonAxios = ({
  url,
  method,
  body = null,
  headers = {},
  after = () => {},
}: UseAxiosOptions) => {
  const [response, setResponse] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const callApi = () => {
    axios
      .request<any, AxiosResponse>({
        url,
        method,
        data: body,
        headers,
      })
      .then((res: AxiosResponse) => {
        setResponse(res.data)
        after(res, null)
      })
      .catch((err: AxiosError) => {
        let message = "Unknown Error"
        if (err.response?.data) {
          const data = err.response.data as any
          message = data.message || message
        } else if (err.request) {
          message = "Cannot get response from the server"
        }
        setError(message)
        after(null, message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { response, error, loading, callApi }
}

export default useButtonAxios
