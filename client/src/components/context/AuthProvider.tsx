import React, { useState, createContext } from "react"
import { UserData } from "../../Helpers/Verify"

export const AuthContext = createContext({})

type properties = {
  userData: UserData | null
  children: React.ReactNode
}

export const AuthProvider = ({ userData, children }: properties) => {
  let [user, setUser] = useState(userData)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)
