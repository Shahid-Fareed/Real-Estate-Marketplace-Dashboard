import { useState, useEffect } from "react"

const useUserRole = () => {
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const authUser = localStorage.getItem("authUser")
    if (authUser) {
      const parsedUser = JSON.parse(authUser)
      const roleTitle = parsedUser?.role[0]?.title || null
      setUserRole(roleTitle)
    }
  }, [])

  return userRole
}

export default useUserRole
