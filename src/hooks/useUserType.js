import { useState, useEffect } from "react"

const useUserType = () => {
  const [userType, setUserType] = useState(null)

  useEffect(() => {
    const authUser = localStorage.getItem("authUser")
    if (authUser) {
      const parsedUser = JSON.parse(authUser)
      const userType = parsedUser?.user_type || null
      setUserType(userType)
    }
  }, [])

  return userType
}

export default useUserType
