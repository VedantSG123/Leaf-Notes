import axios, { AxiosResponse } from "axios"
interface data {
  _id: string
  name: string
  email: string
  token: string
}

interface UserData {
  data: data
}

const getUserDataFromLocalStorage = (): UserData | null => {
  const userDataString = localStorage.getItem("userInfo")
  if (userDataString) {
    return JSON.parse(userDataString)
  }
  return null
}

const verificationReq = async (): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.get(
      "http://localhost:5000/api/user/verify"
    )
    return true
  } catch (err) {
    return false
  }
}
const verify = async (): Promise<boolean> => {
  const userData = getUserDataFromLocalStorage()
  if (userData) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userData.data.token}`
    const res = await verificationReq()
    return res
  } else {
    return false
  }
}

export { verify, getUserDataFromLocalStorage }
export type { UserData }
