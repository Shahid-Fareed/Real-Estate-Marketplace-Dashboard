import { useEffect, useState } from "react";

const useUserCheck = () => {
  const [userCheck, setUserCheck] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authUser");

    if (authToken) {
      try {
        const parsedToken = JSON.parse(authToken);
        const isAdmin = parsedToken?.is_admin === 1;
        const userType = parsedToken?.user_type;
     
        if (isAdmin && userType === "admin") {
          setUserCheck("super_admin");
        } else if (isAdmin && userType === "agency") {
          setUserCheck("agency_admin");
        } else if (!isAdmin && userType === "agency") {
          setUserCheck("agency_user");
        } else if (!isAdmin && userType === "admin") {
          setUserCheck("admin_user");
        }
      } catch (error) {
        console.error("Error parsing authUser data:", error);
      }
    }
  }, []);

  return userCheck;
};

export default useUserCheck;
