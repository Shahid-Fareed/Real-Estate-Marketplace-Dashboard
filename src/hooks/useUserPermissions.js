import { useState, useEffect } from "react"

const useUserPermissions = () => {
  const [permissions, setPermissions] = useState(null)

  useEffect(() => {
    const authUser = localStorage.getItem("authUser")

    if (authUser) {
      const parsedUser = JSON.parse(authUser)
      // console.log("parsed usersss: ", parsedUser)
      const permissionTitles =
        parsedUser?.user_permissions?.map(permission => permission.title) ||
        null
      setPermissions(permissionTitles)
    }
  }, [])

  return permissions
}

export default useUserPermissions
