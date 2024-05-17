import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div
      id="wrapper"
      className="text-slate-300 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-600 to-slate-900 min-h-screen max-h-screen overflow-auto font-garamond"
    >
      <ToastContainer />
      <Navigation />
      <main className="lg:py-3 px-6 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
