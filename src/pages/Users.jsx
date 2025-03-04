import { Navigate } from "react-router-dom";
import UserTable from "../components/users/UserList.jsx";

const Users = () => {

  if (localStorage.getItem('loggedInUser') == null) {
    return <Navigate to="/login" />
  }

  return <div>
    <UserTable />
  </div>;
};

export default Users;
