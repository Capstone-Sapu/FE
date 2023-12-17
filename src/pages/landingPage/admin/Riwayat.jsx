import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { FaTimesCircle } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";
import Modal from "../../../components/elements/modal/Modal";
import { ButtonElement } from "../../../components/elements/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import { toast } from "react-toastify";
import Search from "../../../components/elements/search/Search";
const Riwayat = () => {
  const [selectedIdDelete, setSelectedIdDelete] = useState ();
  const [searchValue, setSearchValue] = useState ("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [riwayat, setRiwayat] = useState ([]);
  const [loading, setLoading] = useState (false)
  
  useEffect(() => {
fetchData();
  }, [searchValue]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/riwayat`, {
        params: {search: searchValue}
      });
      const riwayatData = response.data;
      setRiwayat(riwayatData);
      setLoading (false)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  const handleModalDelete = (id) => {
    setShowModalDelete(!showModalDelete);
    setSelectedIdDelete(id)
  };

  const deleteRiwayat = async () => {
    setLoading (!loading);
    try {
      await axios.delete (`${import.meta.env.VITE_API_URL}/riwayat/${selectedIdDelete}`);
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
           <DataTable value={riwayat}paginator rows={5}>
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
                  handleClick={deleteRiwayat}
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

export default Riwayat;
