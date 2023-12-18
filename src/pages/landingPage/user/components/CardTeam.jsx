import "./css/cardTeam.css";
import CardProfile from "./CardProfile";

const CardTeam = () => {
  const teamMember = [
    {
      nama: 'Delphia Aryana',
      role: "Back End Developer",
      sumber: 'adel',
      github: 'https://github.com/DelphiaAryana',
      instagram: 'https://www.instagram.com/delphiaaryana_',
      linkedIn: 'https://www.linkedin.com/in/delphiaaryana/'
    }, 
    {
      nama: 'iif Alifah',
      role: "Back End Developer",
      sumber: 'iif',
      github: 'https://github.com/IifAlifah',
      instagram: 'https://www.instagram.com/iifalifah_/',
      linkedIn: 'https://www.linkedin.com/in/iif-alifah-38978629a/'
    },
    {
      nama: 'M. Yudya Ananda Hasibuan',
      role: "Front End Developer",
      sumber: 'yudha',
      github: 'https://github.com/YudaHasibuan23',
      instagram: 'https://www.instagram.com/yuda.hasibuan23/',
      linkedIn: '#'
    },
    {
      nama: 'Eriska Hamida Sihotang',
      role: "UI/UX",
      sumber: 'eriska',
      github: '#',
      instagram: 'https://instagram.com/eriskasihotang89?igshid=MzMyNGUyNmU2YQ==',
      linkedIn: '#'
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
