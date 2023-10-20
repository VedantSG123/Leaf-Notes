import axios from "axios"
import debounce from "../debounce"

interface UserRes {
  _id: string
  name: string
  email: string
}

const search = debounce(
  async (
    token: string,
    query: string,
    setUserArray: (usersArray: UserRes[] | undefined) => void
  ) => {
    if (query === "") {
      setUserArray(undefined)
      return
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user?search=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setUserArray(res.data)
    } catch (err) {
      throw err
    }
  },
  800
)
export type { UserRes }
export default search
