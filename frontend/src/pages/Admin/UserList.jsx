import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import AdminMenu from "./AdminMenu";
import { Link } from "react-router-dom";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <div className="w-full pl-[6vw] lg:py-4">
        <Link to="/">
          <p className="text-[32px] font-bold tracking-wider text-center lg:text-left">
            INFINITY
          </p>
        </Link>
        <p className="text-center lg:text-left text-sm">
          Give you infinite meanings in a limited amount of time!
        </p>
      </div>
      <div className="p-4">
        <h1 className="text-4xl font-semibold mb-12 text-white text-center">
          Users
        </h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data.message || error.message}
          </Message>
        ) : (
          <div className="flex flex-col md:flex-row text-white overflow-auto lg:pl-[5vw]">
            <AdminMenu />
            <table className="w-full">
              <thead className="border-2 border-slate-800">
                <tr>
                  <th className="px-4 py-2 text-left text-white border-2 border-slate-800">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-white border-2 border-slate-800">
                    NAME
                  </th>
                  <th className="px-4 py-2 text-left text-white border-2 border-slate-800">
                    EMAIL
                  </th>
                  <th className="px-4 py-2 text-left text-white border-2 border-slate-800">
                    ADMIN
                  </th>
                </tr>
              </thead>
              <tbody className="border-2 border-slate-800">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2 border-2 border-slate-800">
                      {user._id}
                    </td>
                    <td className="px-4 py-2 border-2 border-slate-800">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="w-full p-2 border rounded-lg text-black"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-slate-500 text-white py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.username}{" "}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 border-2 border-slate-800">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            className="w-full p-2 border rounded-lg text-black"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-slate-500 text-white py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <p>{user.email}</p>
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 border-2 border-slate-800">
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>

                    <td className="px-4 py-2 border-2 border-slate-800">
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default UserList;
