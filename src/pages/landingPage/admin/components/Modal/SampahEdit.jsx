import { useEffect, useState } from "react";
import { InputElement } from "../../../../../components/elements/input";
import Modal from "../../../../../components/elements/modal/Modal";
import axios from "axios";
import PropTypes from "prop-types";
import { ButtonElement } from "../../../../../components/elements/button";

const SampahEdit = (props) => {
  const [modalShow, setModalShow] = useState(true);
  const [sampah, setSampah] = useState({
    name: "",
    deskripsi: "",
    image: "",
    price: undefined, // Isi ini sesuai dengan data yang Anda dapat dari API
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSampah((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchSampah = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${props.idSampah}`
        );
        const sampah = response.data;

        // Set data pengguna dari respons API
        setSampah({
          name: sampah.title,
          deskripsi: sampah.description,
          image: sampah.image,
          price: sampah.price,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Panggil fungsi untuk mengambil data pengguna saat komponen dimount
    fetchSampah();
  }, [props.idSampah]);

  const handleHide = () => {
    setModalShow(false);
  };
  return (
    <>
      <Modal
        title="Form Edit Sampah"
        closeButton={true}
        onHide={handleHide}
        show={modalShow}
      >
        <form>
          <InputElement
            label="Nama Sampah"
            type="text"
            name="name"
            id="nama_sampah"
            value={sampah.name === undefined ? "" : sampah.name}
            onChange={handleChange}
            className="mb-2"
            required
          />

          <InputElement
            label="Deskripsi"
            type="text"
            name="deskripsi"
            id="deskripsi"
            value={sampah.deskripsi === undefined ? "" : sampah.deskripsi}
            onChange={handleChange}
            className="mb-2"
            required
          />

          <InputElement
            label=" Harga"
            type="number"
            name="price"
            id="harga"
            value={sampah.price === undefined ? "" : sampah.price}
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
              name="gambar-sampah"
              id="gambar-sampah"
            />
          </div>
          <ButtonElement
            type="submit"
            className="btn btn-success"
            isLoading={false}
          >
            Simpan
          </ButtonElement>
        </form>
      </Modal>
    </>
  );
};
SampahEdit.propTypes = {
  idSampah: PropTypes.number,
};

export default SampahEdit;
