import Sidebar from "./components/sidebar/Sidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { BsTrash3Fill } from "react-icons/bs";
import "./css/user.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import Modal from "../../../components/elements/modal/Modal";
import { ButtonElement } from "../../../components/elements/button";
import { InputElement } from "../../../components/elements/input";
import axios from "axios";
import { toast } from "react-toastify";
const User = () => {
  const [selectedId, setSelectedId] = useState();
  const [showModalEdit, setShowModalEdit] = useState();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getUser, setGetUser] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
  });

  const columns = [
    { field: "name", header: "Nama Customer" },
    { field: "username", header: "Username" },
    { field: "email", header: "Email" },
    { field: "balance", header: "Pendapatan" },
  ];
  const handleDelete = (id) => {
    setShowModalDelete(!showModalDelete);
    setSelectedId(id);  
  };
  const deleteData = async (e) => {
    e.preventDefault();
    try {
      await axios.delete (`${import.meta.env.VITE_API_URL}/users/${selectedId}`)
      toast.success("Data Berhasil Terhapus")
      setShowModalDelete (!showModalDelete);
      fetchData ();
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Terjadi kesalahan server");
      }
    }
  }
  const hideModalEdit = () => {
    setShowModalEdit (!showModalEdit);
  }

  const handleEdit = (id) => {
    setShowModalEdit(!showModalEdit);
    const idUser = id;
    setSelectedId(id)
    
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/${idUser}`
        );
        const user = response.data;

        setUser((prevData) => ({
          ...prevData,
          name: user.name,
          email: user.email,
          username: user.username,
        }));
      } catch (error) {
        console.error("Error fetching User data:", error);
      }
    };
    fetchData();    
  }
  const editData = async (e) => {
    e.preventDefault();
    setLoading (!loading)
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${selectedId}`, user
      );
      setLoading (loading)
      setShowModalEdit (!showModalEdit)
      toast.success ('Data Berhasil di update');
      fetchData ();
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Terjadi kesalahan server");
      }
      setLoading(loading);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      const usersData = response.data;
      setGetUser(usersData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
useEffect(() => {
    fetchData();
  }, []);    
  return (
    <>
      <Sidebar />
      <main className="main-content-admin">
        <div className="table-responsive">
          <DataTable value={getUser} paginator rows={10}>
            {columns.map((col, index) => (
              <Column key={index} field={col.field} header={col.header} sortable style={{ width: '25%' }} />
            ))}
            <Column
              header="Aksi"
              body={(rowData) => (
                <div className="d-flex gap-2">
                  <span
                    className="text-success"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(rowData.id)}
                  >
                    <HiOutlinePencil size={18} />
                  </span>
                  <span
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(rowData.id)}
                  >
                    <BsTrash3Fill size={18} />
                  </span>
                </div>
              )}
            />
          </DataTable>
        </div>
        {showModalDelete && (
          <Modal
            title="Hapus Customer"
            show={showModalDelete}
            onHide={handleDelete}
            closeButton={true}
          >
            <p>Yakin Untuk Menghapus Data ini Dengan Id: {selectedId}</p>
            <div className="text-end">
              <form onSubmit={deleteData}>
              <ButtonElement type="submit" className="btn bg-danger text-white">
                Hapus
              </ButtonElement>
              </form>
            </div>
          </Modal>
        )}
        {showModalEdit && (
          <Modal
            show={showModalEdit}
            onHide={hideModalEdit}
            closeButton={true}
            title="Form Edit Customer"
          >
            <form onSubmit={editData}>
              <InputElement
                label="Nama Lengkap"
                type="text"
                name="name"
                id="full_name"
                value={user.name === undefined ? "" : user.name}
                onChange={handleChange}
                className="mb-2"
                required
              />
              <InputElement
                label="Username"
                type="text"
                name="username"
                id="username"
                value={user.username === undefined ? "" : user.username}
                onChange={handleChange}
                className="mb-2"
                required
              />
              <InputElement
                label="Email"
                type="email"
                name="email"
                id="email"
                value={user.email === undefined ? "" : user.email}
                onChange={handleChange}
                className="mb-2"
                required
              />
              <div className="text-end mt-3">
                <ButtonElement
                  type="submit"
                  className="btn btn-success"
                  isLoading={loading}
                >
                  Simpan
                </ButtonElement>
              </div>
            </form>
          </Modal>
        )}
      </main>
    </>
  );
};

export default User;
