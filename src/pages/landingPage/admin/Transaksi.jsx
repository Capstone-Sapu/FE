import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import Modal from "../../../components/elements/modal/Modal";
import { ButtonElement } from "../../../components/elements/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import { toast } from "react-toastify";
import Search from "../../../components/elements/search/Search";
const Transaksi = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState ();
  const [selectedIdDelete, setSelectedIdDelete] = useState ();
  const [searchValue, setSearchValue] = useState ();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [transaksi, setTransaksi] = useState ([]);

  useEffect(() => {
fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/transaksitable`);
      const transaksiData = response.data;
      setTransaksi(transaksiData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleModal = async (id) => {
    setShowModal(!showModal);
    setSelectedId (id)  
  };
  
  const updateBalance = async () => {
    try {
    await axios.patch (`${import.meta.env.VITE_API_URL}/transaksi/balance/${selectedId}`);
    toast.success("Saldo User Sudah Terupdate")
    setShowModal (!showModal);
    fetchData();
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
  
  const handleModalDelete = (id) => {
    setShowModalDelete(!showModalDelete);
    setSelectedIdDelete(id)
  };

  const deleteTransaksi = async () => {
    try {
      await axios.delete (`${import.meta.env.VITE_API_URL}/transaksi/${selectedIdDelete}`);
      toast.success("Data Berhasil Terhapus")
      setShowModalDelete (!showModalDelete);
      fetchData();
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
  const handleHide = () => {
    setShowModal(!showModal);

  };
  const handleHideDelete = () => {
    setShowModalDelete(!showModalDelete);
  };
  


  const columns = [
    { field: 'user.name', header: 'Nama User' },
    { field: 'product.name', header: 'Nama Sampah' },
    { field: 'product.price', header: 'Harga' },
    { field: 'quantity', header: 'Jumlah (Kg)' },
    { field: 'address', header: 'Alamat' },
    { field: 'noHp', header: 'No Handphone' },
    { field: 'date', header: 'Tanggal' },
    { field: 'total', header: 'Total' },
  ];
  return (
    <>
      <Sidebar />
      <main className="main-content-admin">
        <div className= "d-flex justify-content-end">
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        <div className="table-responsive mt-3">
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
                  handleClick={updateBalance}
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
            title="Tolak Transaksi"
            closeButton={true}
            size={'md'}
          >
            <p>Transaksi Dengan ID: {selectedIdDelete}</p>
            <div className="text-end">

            <ButtonElement
                  type="submit"
                  handleClick={deleteTransaksi}
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
