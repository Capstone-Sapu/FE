import "./css/cardTeam.css";
import CardProfile from "./CardProfile";

const CardTeam = () => {
  const teamMember = [
    {
      nama: 'Delphia Aryana',
      role: "Pengembang Back-end",
      sumber: 'adel',
      github: 'https://github.com/Sugiannoor',
      instagram: 'https://www.instagram.com/sugiannoor22/',
      linkedIn: 'https://www.linkedin.com/in/akhmadsugiannoor/'
    }, 
    {
      nama: 'iif Alifah',
      role: "Pengembang Back-end",
      sumber: 'iif',
      github: 'https://github.com/Sugiannoor',
      instagram: 'https://www.instagram.com/sugiannoor22/',
      linkedIn: 'https://www.linkedin.com/in/akhmadsugiannoor/'
    },
    {
      nama: 'Muhammad Yudya Ananda Hasibuan',
      role: "Front End Developer",
      sumber: 'yudha',
      github: 'https://github.com/Sugiannoor',
      instagram: 'https://www.instagram.com/sugiannoor22/',
      linkedIn: 'https://www.linkedin.com/in/akhmadsugiannoor/'
    },
    {
      nama: 'Eriska Hamida Sihotang',
      role: "UI/UX",
      sumber: 'eriska',
      github: 'https://github.com/Sugiannoor',
      instagram: 'https://instagram.com/eriskasihotang89?igshid=MzMyNGUyNmU2YQ==',
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
