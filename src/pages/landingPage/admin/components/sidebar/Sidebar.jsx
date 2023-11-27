import { MdAdminPanelSettings } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { GiShoppingBag } from "react-icons/gi";
import "../css/sidebar.css"
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    
    <div
      className="sidebar-admin d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary"
      style={{ width: 280 }}
    >
      <div
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
       <MdAdminPanelSettings className="icon-sidebar" style={{width: '40px', height: '40px'}}  color="white"/> 
        <span className="fs-4 text-white">Admin</span>
      </div>
      <hr className="hr-sidebar"/>
      <ul className="nav nav-pills flex-column mb-auto">
        <NavLink to="/customer">
        <li className="nav-item">
          <div className="navigasi">
          <FaUser className="icon-sidebar" color="white"/>
            Customer
          </div>
        </li>
          </NavLink>
            <NavLink to="/sampah">
        <li className="nav-item">
          <div className="navigasi">
          <RiDeleteBin7Fill className="icon-sidebar" color="white"/>
          Sampah
          </div>
        </li>
            </NavLink>
        <NavLink to="/transaksi">
        <li className="nav-item">
          <div className="navigasi">
          <GiShoppingBag className="icon-sidebar" color="white"/>
            Transaksi
          </div>
        </li>
         </NavLink>
      </ul>
      <hr className="hr-sidebar" />
      <div className="sidebar-logout d-flex navigasi">
      <TbLogout className="icon-sidebar"/>
      Logout
      </div>
      
    </div>
  );
};

export default Sidebar;
