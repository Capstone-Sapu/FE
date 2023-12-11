/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { InputElement } from "../../../../../components/elements/input";
import Modal from "../../../../../components/elements/modal/Modal";
import axios from "axios";
import { ButtonElement } from "../../../../../components/elements/button";
import { toast } from "react-toastify";

const SampahEdit = (props) => {
  const [loading, setLoading] = useState (false);
  const [sampah, setSampah] = useState({
    title: "",
    description: "",
    price: 0,
    file: "",
    preview: "",
  });
  const loadImage = (e) => {
    const image = e.target.files[0];
     setSampah((prevData) => ({
    ...prevData,
    file: image,
    preview: URL.createObjectURL(image)
  }));
  };
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
          `${import.meta.env.VITE_API_URL}/items/${props.idSampah}`
        );
        const sampah = response.data;
        setSampah({
          title: sampah.name,
          description: sampah.description,
          price: sampah.price,
          file: sampah.image,
          preview: sampah.url
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Panggil fungsi untuk mengambil data pengguna saat komponen dimount
    fetchSampah();
  }, [props.idSampah]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/items`);
      props.setSampah(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateProduct = async (e) => {
    setLoading (!loading);
    e.preventDefault ();
    const formData = new FormData();

    // Menambahkan data ke objek FormData
    formData.append("title", sampah.title);
    formData.append("file", sampah.file);
    formData.append("description", sampah.description);
    formData.append("price", sampah.price);

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/items/${props.idSampah}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      toast.success ("Data Berhasil di Edit")
      setLoading (!loading);
      props.setModalEditShow (!props.modalEditShow)
      fetchData();
    } catch (error) {
      toast.error (error.response.data.msg)
      setLoading (!loading);
    }
    
  };

  return (
    <>
      <Modal
        title="Form Edit Sampah"
        closeButton={true}
        onHide={props.onHide}
        show={props.show}
      >
        <form onSubmit={updateProduct}>
        <div>
              {sampah.preview ? (
                <figure className="text-center">
                  <img
                    src={sampah.preview}
                    alt="Preview Image"
                    style={{ width: "100px", height: "100px" }}
                  />
                </figure>
              ) : (
                ""
              )}
            </div>
          <InputElement
            label="Nama Sampah"
            type="text"
            name="title"
            id="title"
            value={sampah.title === undefined ? "" : sampah.title}
            onChange={handleChange}
            className="mb-2"
            required
          />

          <InputElement
            label="Deskripsi"
            type="text"
            name="description"
            id="description"
            value={sampah.description === undefined ? "" : sampah.description}
            onChange={handleChange}
            className="mb-2"
            required
          />

          <InputElement
            label=" Harga"
            type="number"
            name="price"
            id="price"
            value={sampah.price === undefined ? "" : sampah.price}
            onChange={handleChange}
            required
          />
          <div className="my-3">
            <label htmlFor="image" className="form-label">
              Gambar
            </label>
            <input
              className="form-control"
              type="file"
              name="image"
              id="image"
              onChange={loadImage}
              
            />
          </div>
          <ButtonElement
            type="submit"
            className="btn btn-success"
            isLoading={loading}
          >
            Simpan
          </ButtonElement>
        </form>
      </Modal>
    </>
  );
};

export default SampahEdit;
