import { FaGithubSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


const CardProfile = ({ nama, role, sumber, github, instagram, linkedIn}) => {
  return (
    <>
    <div className="col-6 col-lg-3">
      <div className="card card-team mt-4 position-relatif">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="position-absolute"
        >
          <path
            fill="#116530"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,192C384,224,480,256,576,277.3C672,299,768,309,864,277.3C960,245,1056,171,1152,154.7C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <div className="card-body d-flex flex-column text-center">
          <img
            src={`/${sumber}.jpg`}
            alt={`Gambar ${sumber}`}
            className="user-image mx-auto"
            style={{ zIndex: 1 }}
          />
          <div className="user-deskripsi">
            <h4 className="text-center">{nama}</h4>
            <span>{role}</span>
          </div>
          <div
            style={{
              color: "#116530",
              fontWeight: "500",
              marginTop: "30px",
            }}
          >
            Social Media:
          </div>
          <div className="media-sosial d-flex gap-2 justify-content-center">
            <Link to={github}>
              <FaGithubSquare size={30} color="green" />
            </Link>
            <Link to={instagram}>
              <FaInstagramSquare size={30} color="green" />
            </Link>
            <Link to={linkedIn}>
              <FaLinkedin size={30} color="green" />
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

CardProfile.propTypes = {
    nama: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    sumber: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    instagram: PropTypes.string.isRequired,
    linkedIn: PropTypes.string.isRequired,
  };


export default CardProfile;
