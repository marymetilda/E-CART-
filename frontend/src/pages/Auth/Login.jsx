import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <section className="lg:pl-[6vw] lg:mt-[1vh] h-full min-h-[80vh] lg:min-h-[90vh] flex">
      <div className="flex flex-col justify-around items-center flex-1 lg:flex-row lg:items-center lg:justify-center lg:flex-wrap px-4 lg:py-8 rounded-lg">
        <div className="lg:hidden text-slate-300">
          <p className="text-center">Welcome back to</p>
          <p className="text-[44px] font-bold tracking-wider text-center">
            INFINITY
          </p>
          <p className="text-center py-4">
            Sign in to explore the world of INFINITY
          </p>
        </div>

        <div className="flex flex-col justify-center p-4 lg:py-8 lg:px-10 w-full lg:w-2/5 lg:h-fit rounded-lg bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-500 to-slate-900 transition-all hover:scale-110">
          <h1 className="text-2xl text-slate-300 font-semibold tracking-wider mb-4">
            Sign In
          </h1>

          <form onSubmit={submitHandler} className="container w-full">
            <div className="my-4">
              <label
                htmlFor="email"
                className="block text-sm text-slate-300 font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-1 border rounded w-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-600 to-slate-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-4">
              <label
                htmlFor="password"
                className="block text-sm text-slate-300 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-1 border rounded w-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 via-slate-600 to-slate-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 to-slate-900 text-slate-300 px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-slate-300">
              New Customer ?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-sky-300 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        <div className="p-12 pt-40 hidden lg:block lg:w-1/2 h-full text-slate-300">
          <p className="text-center">Welcome back to</p>
          <p className="text-[44px] font-bold tracking-wider text-center">
            INFINITY
          </p>
          <p className="text-center text-sm">
            Give you infinite meanings in a limited amount of time!
          </p>
          <p className="text-center pt-8">
            Sign in to explore the world of INFINITY
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
