import { useState } from "react";
import Sidebar from "./components/sidebar/sidebar";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import Modal from "../../../components/elements/modal/Modal";
import { ButtonElement } from "../../../components/elements/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const Transaksi = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState ();
  const [selectedIdDelete, setSelectedIdDelete] = useState ();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const transaksi = [
    {
      id: 1,
      namaUser: "John Doe",
      namaSampah: "Plastik",
      harga: 5000,
      quantity: 2,
      alamat: "Jl.Kayu Tangi",
      tanggal: "2023-11-13",
      total: 10000,
    },
    {
      id: 2,
      namaUser: "Jane Doe",
      namaSampah: "Kertas",
      harga: 3000,
      quantity: 5,
      alamat: "Jl.Kayu Tangi",
      tanggal: "2023-11-14",
      total: 15000,
    },
  ];
  const handleModal = (id) => {
    setShowModal(!showModal);
    setSelectedId (id)
  };
  const handleModalDelete = (id) => {
    setShowModalDelete(!showModalDelete);
    setSelectedIdDelete(id)
  };
  const handleHide = () => {
    setShowModal(!showModal);
  };
  const handleHideDelete = () => {
    setShowModalDelete(!showModalDelete);
  };
  


  const columns = [
    { field: 'namaUser', header: 'Nama User' },
    { field: 'namaSampah', header: 'Nama Sampah' },
    { field: 'harga', header: 'Harga' },
    { field: 'quantity', header: 'Jumlah (Kg)' },
    { field: 'alamat', header: 'Alamat' },
    { field: 'tanggal', header: 'Tanggal' },
    { field: 'total', header: 'Total' },
  ];
  return (
    <>
      <Sidebar />
      <main className="main-content-admin">
        <div className="table-responsive">
           <DataTable value={transaksi} className="p-datatable-hover">
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
                onClick={()=> handleModal (rowData.id)}
              >
                <FaCheckCircle size={18} />
              </span>
              <span
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={()=> handleModalDelete (rowData.id)}
              >
                <FaTimesCircle size={18} />
              </span>
            </div>
            )}
          />
        </DataTable>
        </div>
        {showModal && (
          <Modal
            show={showModal}
            onHide={handleHide}
            title="Transaksi Selesai?"
            closeButton={true}
            size={'md'}
          >
            <p>Transaksi Dengan ID: {selectedId}</p>
            <div className="text-end">

            <ButtonElement
                  type="submit"
                  className="btn bg-success text-white"
                  >
                  Kirim
                </ButtonElement>
                  </div>
          </Modal>
        )}
        {showModalDelete && (
          <Modal
            show={showModalDelete}
            onHide={handleHideDelete}
            title="Hapus Transaksi"
            closeButton={true}
            size={'md'}
          >
            <p>Transaksi Dengan ID: {selectedIdDelete}</p>
            <div className="text-end">

            <ButtonElement
                  type="submit"
                  className="btn bg-danger text-white"
                  >
                  Hapus
                </ButtonElement>
                  </div>
          </Modal>
        )}
      </main>
    </>
  );
};

export default Transaksi;
