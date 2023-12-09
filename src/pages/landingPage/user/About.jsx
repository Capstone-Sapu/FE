import FooterComponent from "../../../components/elements/footer/FooterComponent";
import { NavbarComponent } from "../../../components/navbar";
import CardTeam from "./components/CardTeam";
import Collapse from "./components/Collapse";
import './css/about.css'
import YukSapu from "./components/YukSapu";

const About = () => {
  return (
    <>
      <NavbarComponent />
      <Collapse/>
      <div className="container-fluid bg-white p-3">
      <YukSapu/>
      </div>    
      <div className="container mt-2 ">
      <CardTeam/>     
      </div>
      <FooterComponent/>
    </>
  );
};

export default About;
