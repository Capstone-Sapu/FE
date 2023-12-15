import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";
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
  const [searchValue, setSearchValue] = useState ("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [transaksi, setTransaksi] = useState ([]);
  const [loading, setLoading] = useState (false)
  useEffect(() => {
fetchData();
  }, [searchValue]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/transaksitable`, {
        params: {search: searchValue}
      });
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
    setLoading (!loading)
    try {
    await axios.patch (`${import.meta.env.VITE_API_URL}/transaksi/balance/${selectedId}`);
    toast.success("Saldo User Sudah Terupdate")
    setShowModal (!showModal);
    setLoading (!loading)
    fetchData();
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.msg);
      setLoading (!loading)
    } else if (error.message) {
      toast.error(error.message);
      setLoading (!loading)
    } else {
      toast.error("Terjadi kesalahan server");
      setLoading (!loading)
    }
  }
  }
  
  const handleModalDelete = (id) => {
    setShowModalDelete(!showModalDelete);
    setSelectedIdDelete(id)
  };

  const deleteTransaksi = async () => {
    setLoading (!loading);
    try {
      await axios.delete (`${import.meta.env.VITE_API_URL}/transaksi/${selectedIdDelete}`);
      toast.success("Data Berhasil Terhapus")
      setShowModalDelete (!showModalDelete);
      setLoading (!loading)
      fetchData();
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg);
        setLoading (!loading)
      } else if (error.message) {
        toast.error(error.message);
        setLoading (!loading)
      } else {
        toast.error("Terjadi kesalahan server");
        setLoading (!loading)
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
           <DataTable value={transaksi}paginator rows={5}>
          <Column 
          key="username"
          field="user.name"
          header="Nama User"
          sortable style={{ width: '15%' }}
          />
          {columns.map((col, index) => (
            <Column key={index} field={col.field} header={col.header}/>
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
            <p className="text-success" style={{fontWeight: '700'}}><FaCheckCircle color="green" size={30}/> Pastikan Sampah Sudah Diterima</p>
            <p className="text-success" style={{fontWeight: '700'}}><FaCheckCircle color="green" size={30}/> Mengupdate Saldo User</p>
            <div className="text-end">

            <ButtonElement
                  type="submit"
                  handleClick={updateBalance}
                  className="btn bg-success text-white"
                  isLoading={loading}
                  >
                  Selesai
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
            <p className="text-danger" style={{fontWeight: '700'}}><MdDangerous color="red" size={30}/> Pastikan Sudah Menghubungi Customer</p>
            <p className="text-danger" style={{fontWeight: '700'}}><MdDangerous color="red" size={30}/> Data akan terhapus Permanent</p>
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
