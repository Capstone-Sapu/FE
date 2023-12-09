import "./css/cardTeam.css";
import CardProfile from "./CardProfile";

const CardTeam = () => {
  const teamMember = [
    {
      nama: 'Akhmad Sugiannoor',
      role: "Front End Developer",
      sumber: 'sugi',
      github: 'https://github.com/Sugiannoor',
      instagram: 'https://www.instagram.com/sugiannoor22/',
      linkedIn: 'https://www.linkedin.com/in/akhmadsugiannoor/'
    }, 
    {
      nama: 'Akhmad Sugiannoor',
      role: "Front End Developer",
      sumber: 'sugi',
      github: 'https://github.com/Sugiannoor',
      instagram: 'https://www.instagram.com/sugiannoor22/',
      linkedIn: 'https://www.linkedin.com/in/akhmadsugiannoor/'
    },
    {
      nama: 'Akhmad Sugiannoor',
      role: "Front End Developer",
      sumber: 'sugi',
      github: 'https://github.com/Sugiannoor',
      instagram: 'https://www.instagram.com/sugiannoor22/',
      linkedIn: 'https://www.linkedin.com/in/akhmadsugiannoor/'
    },
    {
      nama: 'Akhmad Sugiannoor',
      role: "Front End Developer",
      sumber: 'sugi',
      github: 'https://github.com/Sugiannoor',
      instagram: 'https://www.instagram.com/sugiannoor22/',
      linkedIn: 'https://www.linkedin.com/in/akhmadsugiannoor/'
    },
    {
      nama: 'Akhmad Sugiannoor',
      role: "Front End Developer",
      sumber: 'sugi',
      github: 'https://github.com/Sugiannoor',
      instagram: 'https://www.instagram.com/sugiannoor22/',
      linkedIn: 'https://www.linkedin.com/in/akhmadsugiannoor/'
    },
  ]
  return (
    <>
      <h4 className="header-card-team text-center">Tim Pengembang</h4>
      <hr className="line-header" />
      <div className="row mb-5 d-flex justify-content-center">
          {/* File Harus Jpg props sumber akan menghasilan Sugi.jpg*/}
          {teamMember.map ((member, key) => (
            <CardProfile key={key} {...member}/>
          ))}
        </div>
    </>
  );
};

export default CardTeam;
