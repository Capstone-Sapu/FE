import { LiaInstagram, LiaMapSolid } from "react-icons/lia";
import "./css/cardContact.css";
import GoogleMap from "./GoogleMaps";
import { FaWhatsapp} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const CardContact = () => {
  const [user, setUser] = useState({
    balance: 0,
    email: "",
    exp: 0,
    name: "",
    userId: 0,
    role: "",
  });
  useEffect (()=> {
    const data = JSON.parse (localStorage.getItem ("userData"));
      setUser ({
    balance: data.balance,
    email: data.email,
    exp: data.exp,
    name: data.name,
    userId: data.userId,
    role: data.role,
      })
  }, [])
  
    
  return (
    <div>
      <h4 className="text-center header-contact">
        Contact
        <span>
          <LiaMapSolid size={40} color="green" />
        </span>
      </h4>
      <hr className="line-header" />
      <div className="row contact">
        <div className="col-12 col-lg-6">
          <GoogleMap />
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center p-3">
          <div className="title-contact">
            Hello <span>{user.name} </span>Memiliki <span>Keluhan? </span>
            Segera hubungi kami!
          </div>
          <div className="d-flex gap-3">
            <Link to={"https://www.google.com/maps/place/Museum+Lambung+Mangkurat/@-3.442821,114.838412,14z/data=!4m6!3m5!1s0x2de6810dd27cdb3d:0xf5c19d6b3bc3d1c0!8m2!3d-3.4428206!4d114.8384124!16s%2Fm%2F0b6g29z?hl=id&entry=ttu"} className="icon-maps" target="_blank">
              <LiaMapSolid size={40} color="white" style={{cursor: 'pointer'}} />
            </Link>
            <Link className="icon-maps">
              <FaWhatsapp size={40} color="white" style={{cursor: 'pointer'}} />
            </Link>
            <Link className="icon-maps" style={{cursor: 'pointer'}}>
              <LiaInstagram size={40} color="white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardContact;
