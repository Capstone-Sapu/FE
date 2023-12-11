
import { FaGithubSquare, FaInstagramSquare, FaWhatsappSquare } from 'react-icons/fa';
import './footer.css'
const FooterComponent = () => {
  return (
    <footer className="py-3">
    <ul className="nav justify-content-center">
      <li className="nav-item"><a href="#" className="nav-link px-2 text-white"> <FaGithubSquare size={40} style={{cursor: 'pointer'}} /></a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-white"><FaInstagramSquare size={40} style={{cursor: 'pointer'}} /></a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-white"><FaWhatsappSquare size={40} style={{cursor: 'pointer'}} /></a></li>
    </ul>
    <p className="text-center" style={{fontSize: '0.8rem', fontWeight: '400', color: 'white'}}>Copyright © SAPU | SIB Cycle 5 2023 - Dicoding Academy</p>
  </footer>
  );
}

export default FooterComponent
