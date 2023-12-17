import { MdAdminPanelSettings } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { GiShoppingBag } from "react-icons/gi";
import { FaHistory } from 'react-icons/fa';
import "../css/sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronCircleRight, FaTimes } from "react-icons/fa";
const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const logOut = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/logout`);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData")) || "";
    const admin = data.role;
    if (!localStorage.getItem("access_token") || admin !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  const handleResize = () => {
    setIsSidebarOpen(window.innerWidth > 768);
  };
  window.addEventListener("resize", handleResize);
  return (
    <div
      className={`sidebar-admin d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary position-relatif ${
        isSidebarOpen ? "open" : ""
      }`}
    >
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        {isSidebarOpen ? (
          <MdAdminPanelSettings
            className="icon-sidebar"
            style={{ width: "40px", height: "40px" }}
            color="white"
          />
        ) : (
          ""
        )}
        <span className="fs-4 text-white">{isSidebarOpen ? "Admin" : ""}</span>
      </div>
      {isSidebarOpen ? <hr className="hr-sidebar" /> : ""}
      <ul className="nav nav-pills flex-column mb-auto">
        <NavLink to="/customer">
          <li className="nav-item">
            <div className={`navigasi ${isSidebarOpen ? "open" : ""}`}>
              <FaUser
                className={`icon-sidebar ${isSidebarOpen ? "open" : ""}`}
                color="white"
              />
              {isSidebarOpen ? "Customer" : ""}
            </div>
          </li>
        </NavLink>
        <NavLink to="/sampah">
          <li className="nav-item">
            <div className={`navigasi ${isSidebarOpen ? "open" : ""}`}>
              <RiDeleteBin7Fill
                className={`icon-sidebar ${isSidebarOpen ? "open" : ""}`}
                color="white"
              />
              {isSidebarOpen ? "Sampah" : ""}
            </div>
          </li>
        </NavLink>
        <NavLink to="/transaksi">
          <li className="nav-item">
            <div className={`navigasi ${isSidebarOpen ? "open" : ""}`}>
              <GiShoppingBag
                className={`icon-sidebar ${isSidebarOpen ? "open" : ""}`}
                color="white"
              />
              {isSidebarOpen ? "Transaksi" : ""}
            </div>
          </li>
        </NavLink>
        <NavLink to="/riwayat">
          <li className="nav-item">
            <div className={`navigasi ${isSidebarOpen ? "open" : ""}`}>
              <FaHistory
                className={`icon-sidebar ${isSidebarOpen ? "open" : ""}`}
                color="white"
              />
              {isSidebarOpen ? "Riwayat" : ""}
            </div>
          </li>
        </NavLink>
      </ul>
      <hr className="hr-sidebar" />
      <div className={`sidebar-logout d-flex navigasi ${isSidebarOpen ? "open": ""}`} onClick={logOut}>
        {isSidebarOpen ?  ( <> <TbLogout className={`icon-sidebar open`} />
        <p>Logout</p></>) : <TbLogout className="icon-sidebar"/>}
       
      </div>
      {isSidebarOpen === true && (
        <FaTimes
          color="white"
          size={30}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "20",
            top: "20",
          }}
          onClick={toggleSidebar}
        />
      )}
      {isSidebarOpen === false && (
        <FaChevronCircleRight
          color="white"
          size={26}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "10",
            top: "10",
          }}
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
