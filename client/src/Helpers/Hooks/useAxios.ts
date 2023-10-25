import { useState, useEffect } from "react"
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"

interface UseAxiosOptions<A> {
  url: string
  method: "get" | "post" | "put" | "delete" | "patch"
  body?: any
  headers?: AxiosRequestConfig["headers"]
  after?: (response: A | null, error: string | null) => void
}

const useAxios = <T>({
  url,
  method,
  body = null,
  headers = {},
  after = () => {},
}: UseAxiosOptions<T>) => {
  const [response, setResponse] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = () => {
    axios
      .request<any, AxiosResponse>({
        url,
        method,
        data: body,
        headers,
      })
      .then((res: AxiosResponse) => {
        setResponse(res.data)
        after(res.data, error)
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

  useEffect(() => {
    fetchData()
  }, [])

  return { response, error, loading }
}

export default useAxios
