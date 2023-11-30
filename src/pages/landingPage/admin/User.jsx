import Sidebar from "./components/sidebar/sidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { BsTrash3Fill } from "react-icons/bs";
import "./css/user.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import Modal from "../../../components/elements/modal/Modal";
import { ButtonElement } from "../../../components/elements/button";
import { InputElement } from "../../../components/elements/input";
const User = () => {
  const [selectedId, setSelectedId] = useState();
  const [showModalEdit, setShowModalEdit] = useState();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [user, setUser] = useState({
    id: undefined,
    name: "",
    email: "",
    username: "",
    balance: 0,
  });
  const getUsers = [
    {
      id: 1,
      name: "Akhmad Sugiannoor",
      email: "Sugiannoor@gmail.com",
      username: "sugiannoor",
      balance: 1000000,
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "doe@gmail.com",
      username: "Doe",
      balance: 120000,
    },
  ];

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
  const handleEdit = (id) => {
    setShowModalEdit(!showModalEdit);
    setSelectedId(id);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <Sidebar />
      <main className="main-content-admin">
        <div className="table-responsive">
          <DataTable value={getUsers}>
            {columns.map((col, index) => (
              <Column key={index} field={col.field} header={col.header} />
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
            <p>Yakin Untuk Menghapus Data ini {selectedId}</p>
            <div className="text-end">
              <ButtonElement type="submit" className="btn bg-danger text-white">
                Hapus
              </ButtonElement>
            </div>
          </Modal>
        )}
        {showModalEdit && (
          <Modal
            show={showModalEdit}
            onHide={handleEdit}
            closeButton={true}
            title="Form Edit Customer"
          >
            <form>
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
              <InputElement
                label="Pendapatan"
                type="number"
                name="balance"
                id="balance "
                value={user.balance === undefined ? "" : user.balance}
                onChange={handleChange}
                className="mb-2"
                disabled
              />
              <div className="text-end mt-3">
                <ButtonElement
                  type="submit"
                  className="btn btn-success"
                  isLoading={false}
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
