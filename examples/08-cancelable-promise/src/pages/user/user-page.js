import React from "react";
import { Link } from "react-router-dom";
import { trackPromise } from "../../../../../build/es";
import { userAPI } from "../../api/user-api";
import { UserTable } from "./components";

export const UserPage = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchUserAsync = async () => {
      const users = await trackPromise(userAPI.fetchUsers());
      setUsers(users); // This line may cause a warning if the component is unmount
    };

    fetchUserAsync();
  }, []);

  return (
    <div>
      <h2>User Page</h2>
      <h3>
        In this sample, if you leave before the promise ends, the spinner
        continous to show
      </h3>
      <Link to="/post">Navigate to Page B</Link>
      <br />
      <Link to="/another">Navigate to Another Page</Link>
      <br />
      <UserTable users={users} />
    </div>
  );
};
