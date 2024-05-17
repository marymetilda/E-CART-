import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <section className="lg:pl-[6vw] lg:mt-[1vh] h-full min-h-[90vh] flex">
      <div className="flex flex-col justify-around items-center flex-1 lg:flex-row lg:items-center lg:justify-center lg:flex-wrap px-4 lg:py-8 rounded-lg">
        <div className="lg:hidden">
          <p className="text-center">Welcome back to</p>
          <p className="text-[44px] font-bold tracking-wider text-center">
            INFINITY
          </p>
          <p className="text-center py-4">
            Sign in to explore the world of INFINITY
          </p>
        </div>

        <div className="flex flex-col justify-center p-4 lg:py-8 lg:px-10 w-full lg:w-2/5 lg:h-fit rounded-lg bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900 transition-all hover:scale-110">
          <h1 className="text-2xl font-semibold tracking-wider mb-4">
            Register
          </h1>

          <form onSubmit={submitHandler} className="container w-full">
            <div className="my-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-1 border rounded w-full text-white bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-700 to-slate-900"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="email"
                className="block text-sm text-white font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-1 border rounded w-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-700 to-slate-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="password"
                className="block text-sm text-white font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-1 border rounded w-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-700 to-slate-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-1 border rounded w-full text-white bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-700 to-slate-900"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-900 to-slate-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-white">
              Alteady have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-sky-300 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className="p-12 pt-40 hidden lg:block lg:w-1/2 h-full">
          <p className="text-center">Welcome to</p>
          <p className="text-[44px] font-bold tracking-wider text-center">
            INFINITY
          </p>
          <p className="text-center text-sm">
            Give you infinite meanings in a limited amount of time!
          </p>
          <p className="text-center pt-8">
            Register for exploring the world of INFINITY
          </p>
          {/* <img
          src="https://plus.unsplash.com/premium_photo-1671751035347-e308f0a19b28?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full rounded-lg"
        /> */}
        </div>
      </div>
    </section>
  );
};

export default Register;
