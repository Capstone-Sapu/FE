import FooterComponent from "../../../components/elements/footer/FooterComponent"
import { NavbarComponent } from "../../../components/navbar"
import CardContact from "./components/CardContact"


const Contact = () => {
  return (
    <div>
      <NavbarComponent/>
      <div className="container-fluid bg-white p-4">
      <CardContact/>
      </div>
      <FooterComponent/>
    </div>
  )
}

export default Contact
