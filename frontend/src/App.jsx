import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div
      id="wrapper"
      className="bg-black min-h-screen max-h-screen overflow-auto"
    >
      <ToastContainer />
      <Navigation />
      <main className="py-3 px-6 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
