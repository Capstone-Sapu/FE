import { BsTrash3Fill } from "react-icons/bs";
import Sidebar from "./components/sidebar/sidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { ButtonElement } from "../../../components/elements/button";
import { useState } from "react";
import SampahEdit from "./components/Modal/SampahEdit";

const Sampah = () => {
  const [modalEditShow, setModalEditShow] = useState(false);
  const [sampahId, setSampahId] = useState ();
  const sampah = [
    {
      id: 1,
      name: "Kertas HVS",
      price: 2500,
      deskripsi: "HVS sendiri adalah singkatan dari Hout Virj Schrijfpapier yang artinya kertas tulis bebas serat kayu. Walau termasuk kedalam benda yang mudah didapatkan",
    },
    {
      id: 2,
      name: "Kardus",
      price: 2500,
      deskripsi:
        "Kardus merupakan kemasan yang di buat dari bahan kertas kraft yang di ciptakan dengan berbahan bergelombang dengan memiliki ketinggian dan ketebalan yang sudah di tentukan. Kardus sering kita temui seperti pada pengemasan produk tertentu dan lain sebagainya.",
    },
    {
      id: 3,
      name: "Kaleng",
      price: 2000,
      deskripsi:
        "Kaleng adalah lembaran baja yang disalut timah (Sn) atau berupa wadah yang dibuat dari baja dan dilapisi timah putih tipis dengan kadar tidak lebih dari 1,00-1,25% dari berat kaleng itu sendiri.",
    },
  ];
  const handleEdit = (id) => {
    setModalEditShow (!modalEditShow);
    setSampahId(id);
  }
  
  return (
    <>
      <Sidebar />
      <main className="main-content-admin">
        <div className="row">
          <div className="col-3">
          <ButtonElement
          type="submit"
          className="btn btn-success mb-3"
        >
          Tambah Sampah
        </ButtonElement>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Sampah</th>
                <th scope="col">Harga</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sampah.map((sampah, index) => (
                <tr key={sampah.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{sampah.name}</td>
                  <td>{sampah.price}</td>
                  <td>{sampah.deskripsi}</td>
                  <td>
                    <div className="d-flex gap-2 p-1">
                    <span className="text-primary" onClick={ ()=> handleEdit(sampah.id)} style={{cursor: 'pointer'}}>
                      <HiOutlinePencil size={18}/>
                    </span>
                    <span className="text-danger" style={{cursor: 'pointer'}}>
                      <BsTrash3Fill size={18}/>
                    </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {modalEditShow && (
          <SampahEdit idSampah={sampahId}/>
        )}
      </main>
    </>
  );
};

export default Sampah;
