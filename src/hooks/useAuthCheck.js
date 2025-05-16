import { useState, useEffect } from "react"

const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authToken = localStorage.getItem("auth")
    setIsAuthenticated(!!authToken)
  }, [])

  return isAuthenticated
}

export default useAuthCheck