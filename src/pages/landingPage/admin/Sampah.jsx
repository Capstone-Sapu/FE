import { BsTrash3Fill } from "react-icons/bs";
import Sidebar from "./components/sidebar/sidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { ButtonElement } from "../../../components/elements/button";
import { useState } from "react";
import SampahEdit from "./components/Modal/SampahEdit";
import Modal from "../../../components/elements/modal/Modal";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputElement } from "../../../components/elements/input";



const Sampah = () => {
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalAddShow, setModalAddShow] = useState(false);
  const [tambahSampah, setTambahSampah] = useState ({
    name: "",
    price: undefined,
    deskripsi: "",
    image: "",
  });
  const [sampahId, setSampahId] = useState();
  const sampah = [
    {
      id: 1,
      name: "Kertas HVS",
      price: 2500,
      deskripsi:
        "HVS sendiri adalah singkatan dari Hout Virj Schrijfpapier yang artinya kertas tulis bebas serat kayu. Walau termasuk kedalam benda yang mudah didapatkan",
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
    setModalEditShow(!modalEditShow);
    setSampahId(id);
  };
  const handleDelete = (id) => {
    setModalDeleteShow(!modalDeleteShow);
    setSampahId(id);
  };
  const handleAdd = () => {
    setModalAddShow(!modalAddShow);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTambahSampah((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const columns = [
    { field: 'name', header: 'Nama Sampah' },
    { field: 'price', header: 'Harga' },
    { field: 'deskripsi', header: 'Deskripsi' }, // Add this for action column
  ];

  const actionTemplate = (rowData) => (
    <div className="d-flex gap-2 p-1">
      <span
        className="text-success"
        onClick={() => handleEdit(rowData.id)}
        style={{ cursor: 'pointer' }}
      >
        <HiOutlinePencil size={18} />
      </span>
      <span
        className="text-danger"
        style={{ cursor: 'pointer' }}
        onClick={() => handleDelete(rowData.id)}
      >
        <BsTrash3Fill size={18} />
      </span>
    </div>
  );

  return (
    <>
      <Sidebar />
      <main className="main-content-admin">
        <div className="row">
          <div className="col-3">
            <ButtonElement type="submit" className="btn btn-success mb-3" handleClick={handleAdd}>
              Tambah Sampah
            </ButtonElement>
          </div>
        </div>

        <DataTable value={sampah} tableStyle={{ minWidth: '50rem' }}>
            {columns.map((col) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
              />
            ))}
            <Column
              key="action"
              header="Aksi"
              body={actionTemplate}
            />
          </DataTable>
          
        {modalEditShow && <SampahEdit idSampah={sampahId} />}
        {modalDeleteShow && (
          <Modal
            title="Hapus Sampah"
            show={modalDeleteShow}
            onHide={handleDelete}
            closeButton={true}
          >
            <p>Yakin Untuk Menghapus Data ini ?</p>
            <div className="text-end">
              <ButtonElement type="submit" className="btn bg-danger text-white">
                Hapus
              </ButtonElement>
            </div>
          </Modal>
        )}
        {modalAddShow && (
           <Modal
           title="Form Tambah Sampah"
           show={modalAddShow}
           onHide={handleAdd}
           closeButton={true}
         >
           <form>
          <InputElement
            label="Nama Sampah"
            type="text"
            name="name"
            id="nama_sampah"
            value={tambahSampah.name === undefined ? "" : tambahSampah.name}
            onChange={handleChange}
            className="mb-2"
            required
          />

          <InputElement
            label="Deskripsi"
            type="text"
            name="deskripsi"
            id="deskripsi"
            value={tambahSampah.deskripsi === undefined ? "" : tambahSampah.deskripsi}
            onChange={handleChange}
            className="mb-2"
            required
          />

          <InputElement
            label=" Harga (Rp)"
            type="number"
            name="price"
            id="harga"
            value={tambahSampah.price === undefined ? "" : tambahSampah.price}
            onChange={handleChange}
            required
          />
          <div className="my-3">
            <label htmlFor="gambar-sampah" className="form-label">
              Gambar
            </label>
            <input
              className="form-control"
              type="file"
              name="image"
              id="gambar-sampah"
              required
            />
          </div>
          <div className="text-end">
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

export default Sampah;
