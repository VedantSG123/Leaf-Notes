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

const deleteUserDataFromLocalStorage = () => {
  const userDataString = localStorage.getItem("userInfo")
  if (userDataString) {
    localStorage.removeItem("userInfo")
  }
}

const verify = async () => {
  const userData = getUserDataFromLocalStorage()

  if (userData) {
    try {
      const response: AxiosResponse = await axios.get(
        `${import.meta.env.VITE_APIURL}/api/user/verify`,
        {
          headers: {
            Authorization: `Bearer ${userData.data.token}`,
          },
        }
      )
      if (response.status === 200) return true
      else return false
    } catch (err) {
      return false
    }
  } else {
    return false
  }
}

export { verify, getUserDataFromLocalStorage, deleteUserDataFromLocalStorage }
export type { UserData }
