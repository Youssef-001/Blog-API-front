import { Navigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

function PrivateRouter({ children }) {
    const token = localStorage.getItem("token");
    let decodedToken;
    console.group(token);
    if (token)
     decodedToken = jwtDecode(token);


  console.log(decodedToken);
  
    return (token && decodedToken.username=="admin" ) ? children : <Navigate to="/login" />;
  }

  export default PrivateRouter;