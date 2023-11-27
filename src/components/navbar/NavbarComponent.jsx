import { GiHamburgerMenu } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import "./NavbarComponents.css";
import { useEffect, useState } from "react";
import { ButtonElement } from "../elements/button";

const NavbarComponent = () => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
      setShowProfile(!showProfile);
    
  };
  const handleLogOut = () => {
    navigate("/");
  };

  useEffect (()=> {
    
  })

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img src="./src/assets/sapu.webp" alt="Sapu Icon" />

            <span>Sapu</span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <GiHamburgerMenu color="#E8E8CC" />
          </button>
          <div
            className="collapse navbar-collapse position-relatif"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <NavLink to="/beranda" className="nav-item">
                <li className="nav-link">beranda</li>
              </NavLink>
              <NavLink to="/kontak" className="nav-item">
                <li className="nav-link">kontak</li>
              </NavLink>
              <NavLink to="/tentang" className="nav-item">
                <li className="nav-link">tentang</li>
              </NavLink>
            </ul>
            <div
              className="avatar-profile"
              style={{ right: 25, cursor: "pointer" }}
              onClick={handleClick}
            >
              <RxAvatar size={30} color="green" />
              {showProfile ? (
                <div className="profile-info position-relatif" style={{cursor: 'normal'}}>
                  <div className="text-end" onClick={handleClick}>
                    <FaTimes />
                  </div>
                  <p>Username: Akhmad Sugiannoor</p>
                  <p>Total Saldo: Rp. 100.000.000</p>
                  <ButtonElement
                    className="btn btn-danger logout-btn"
                    handleClick={handleLogOut}
                    isLoading={false}
                  >
                    Logout
                  </ButtonElement>
                </div>
              ): (<>
              </>)}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
