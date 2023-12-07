import { useState } from "react";
import InputElement from "../../../components/elements/input/InputElement";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ButtonElement } from "../../../components/elements/button";
import "./registerForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState (false);
  const navigasi = useNavigate();

  const [registrasi, setRegistrasi] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confPassword: "",
    // Isi ini sesuai dengan data yang Anda dapat dari API
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading (true)
    try {
      await axios.post("http://localhost:4000/users", registrasi);
      setLoading (false)
      navigasi("/")
    } catch (error) {
      if (error.response) {
        setLoading (false)
        toast.error(error.response.data.msg);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword1(!showPassword1);
  };
  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrasi((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="card card-registForm mx-auto" style={{ zIndex: 1 }}>
      <div className="card-body position-relatif">
        <form onSubmit={handleSubmit}>
          <InputElement
            label="Nama Lengkap"
            type="text"
            id="fullName"
            name="name"
            placeholder="Masukkan Nama Lengkap"
            className="mb-3"
            onChange={handleChange}
            value={registrasi.name === undefined ? "" : registrasi.name}
          />
          <InputElement
            label="Username"
            type="text"
            id="username"
            name="username"
            placeholder="Masukkan username"
            className="mb-3"
            onChange={handleChange}
            value={registrasi.username === undefined ? "" : registrasi.username}
          />

          <InputElement
            label="Email"
            type="email"
            name="email"
            id="email"
            placeholder="Masukkan email"
            className="mb-3"
            onChange={handleChange}
            value={registrasi.email === undefined ? "" : registrasi.email}
          />
          <span
            className="form-control-icon mx-2 pt-2"
            onClick={handleTogglePassword}
          >
            {showPassword1 ? (
              <BsEye color="green" size={22} />
            ) : (
              <BsEyeSlash color="green" size={22} />
            )}
          </span>

          <InputElement
            label="Password"
            type={showPassword1 ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Masukkan Password"
            className="mb-3"
            value={registrasi.password === undefined ? "" : registrasi.password}
            onChange={handleChange}
          />
          <span
            className="form-control-icon mx-2 pt-2"
            onClick={handleTogglePassword2}
          >
            {showPassword2 ? (
              <BsEye color="green" size={22} />
            ) : (
              <BsEyeSlash color="green" size={22} />
            )}
          </span>

          <InputElement
            label="Konfirmasi Password"
            type={showPassword2 ? "text" : "password"}
            name="confPassword"
            id="confirm_password"
            placeholder="Konfirmasi Password"
            value={
              registrasi.confPassword === undefined
                ? ""
                : registrasi.confPassword
            }
            className="mb-3 form-control"
            onChange={handleChange}
          />
          <ButtonElement
            isLoading={loading}
            type="submit"
            className="btn btn-success mt-2 w-10"
          >
            Daftar
          </ButtonElement>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
