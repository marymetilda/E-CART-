import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className={`bg-black min-h-screen max-h-screen ${isModalOpen ? "overflow-hidden" : "overflow-scroll"}`}
    >
      <ToastContainer />
      <Navigation handleModal={handleModal} />
      <main className="py-3 px-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
