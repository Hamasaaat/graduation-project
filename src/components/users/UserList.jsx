import { useState, useEffect } from "react";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

// TODO: RANIA the initial values for the form
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required"),
  role: Yup.string().required("Role is required"),
  isBlocked: Yup.boolean().required("Blocked status is required"),
});

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const handleToggleStatus = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].isBlocked = !updatedUsers[index].isBlocked;
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // TODO: RANIA: change to a pop up
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Users Management</h2>
      <p className="mb-6 text-gray-600">
        Admins can view the list of users and block or unblock them to control
        access to the platform.
      </p>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-gray-200">
              Username
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-gray-200">
              Email
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-gray-200">
              Role
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-gray-200">
              Status
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}
            >
              <td className="py-3 px-4 text-sm text-gray-800 border-b border-gray-200">
                {user.username}
              </td>
              <td className="py-3 px-4 text-sm text-gray-800 border-b border-gray-200">
                {user.email}
              </td>
              <td className="py-3 px-4 text-sm text-gray-800 border-b border-gray-200">
                {user.role}
              </td>
              <td className="py-3 px-4 text-sm text-gray-800 border-b border-gray-200">
                {user.isBlocked ? (
                  <span className="text-red-500">Blocked</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </td>
              <td className="py-3 px-4 border-b border-gray-200">
                <button onClick={() => handleViewUser(user)} className="mr-4">
                  View
                </button>
                {user.username !== "admin" && (
                  <button onClick={() => handleToggleStatus(index)}>
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                )}
                {user.username === "admin" && (
                  <button disabled className="text-gray-400 cursor-not-allowed">
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">User Details</h3>
            <p className="mb-2">
              <strong>ID:</strong> {selectedUser.id}
            </p>
            <p className="mb-2">
              <strong>Username:</strong> {selectedUser.username}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="mb-2">
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              {selectedUser.isBlocked ? "Blocked" : "Active"}
            </p>
            <p className="mb-4">
              <strong>Creation Date:</strong> {selectedUser.createdDate}
            </p>
            <div className="flex justify-end">
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
