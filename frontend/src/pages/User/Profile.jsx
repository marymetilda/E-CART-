import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="w-full pl-[6vw] lg:pt-4">
        <p className="text-[32px] font-bold tracking-wider text-center lg:text-left">
          INFINITY
        </p>
        <p className="text-center lg:text-left text-sm">
          Give you infinite meanings in a limited amount of time!
        </p>
      </div>
      <div className="flex flex-col justify-center items-center md:flex pt-10">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl font-semibold mb-4 text-white text-center pb-8">
            Profile
          </h2>
        </div>
        <div className="w-full lg:w-1/2 text-center">
          <p className="text-2xl">Name : {userInfo.username}</p>
          <p className="text-2xl">Email : {userInfo.email}</p>
          <div className="flex justify-center gap-12 pt-12">
            <Link
              to="/update-profile"
              className="text-white py-2 px-4 rounded bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900"
            >
              Update Profile
            </Link>

            <Link
              to="/user-orders"
              className="text-white py-2 px-4 rounded bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900"
            >
              My Orders
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
