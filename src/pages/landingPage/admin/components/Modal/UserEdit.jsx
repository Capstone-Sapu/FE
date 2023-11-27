import { useEffect, useState } from "react";
import { InputElement } from "../../../../../components/elements/input";
import Modal from "../../../../../components/elements/modal/Modal";
import axios from "axios";
import PropTypes from 'prop-types';
import { ButtonElement } from "../../../../../components/elements/button";


const UserEdit = (props) => {

    const [userData, setUserData] = useState({
        namaLengkap: '',
        username: '',
        email: '',
        password: '', // Isi ini sesuai dengan data yang Anda dapat dari API
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`https://api.example.com/users/${props.idUser}`);
            const user = response.data;
    
            // Set data pengguna dari respons API
            setUserData({
              namaLengkap: user.namaLengkap,
              username: user.username,
              email: user.email,
              password: user.password, // Isi ini sesuai dengan data yang Anda dapat dari API
            });
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        // Panggil fungsi untuk mengambil data pengguna saat komponen dimount
        fetchUserData();
      }, [props.idUser]);
  return (
    <>
      <Modal title="Form Edit User" closeButton={true}>
        <form action="">
        <InputElement
            label="Nama Lengkap"
            type="text"
            name="nama_lengkap"
            id="nama_lengkap"
            value={userData.namaLengkap}
            onChange= {handleChange}
            required
          />

          <InputElement
            label="Username"
            type="text"
            name="username"
            id="username"
            value={userData.username}
            onChange= {handleChange}
            required
          />

          <InputElement
            label="Email"
            type="email"
            name="email_user"
            id="email_user"
            value={userData.email}
            onChange= {handleChange}
            required
          />
           <InputElement
            label="Password"
            name="password_user"
            id="password_user"
            type="password"
            value={userData.password}
            disabled
            
          />
           <ButtonElement
              type="submit"
              className="btn btn-success"
              isLoading={false}
            >
              Simpan
            </ButtonElement>
            <ButtonElement
              type="submit"
              className="btn btn-danger mx-2"
              isLoading={false}
            >
              Kembali
            </ButtonElement>
        </form>
      </Modal>
    </>
  );
};
UserEdit.propTypes = {
  idUser: PropTypes.number.isRequired,
};

export default UserEdit;
