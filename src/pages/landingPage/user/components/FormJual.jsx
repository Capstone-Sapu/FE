/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { InputElement } from "../../../../components/elements/input";
import { ButtonElement } from "../../../../components/elements/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Modal from "../../../../components/elements/modal/Modal";
import { toast } from "react-toastify";
import moment from "moment";

const FormJual = () => {
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const { idBarang } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    nama_barang: "",
    alamat: "",
    nomor_hp: "",
    harga: "",
    image: "",
    jumlah: undefined,
    date: moment().format("YYYY-MM-DD"),
    userId: 0,
  });

  const dataToPost = {
    id_item: idBarang,
    id_user: formData.userId,
    address: formData.alamat,
    noHp: formData.nomor_hp,
    quantity: formData.jumlah,
    date: formData.date,
  };
  const saveTransaksi = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/transaksi`, dataToPost);
      toast.success("Team akan Menjemput Sampah ke lokasi 1 x 24 Jam");
      setModalShow(!modalShow);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/items/${idBarang}`
        );
        const productData = response.data;

        setFormData((prevData) => ({
          ...prevData,
          nama_barang: productData.name,
          harga: productData.price, // convert harga to string if needed
          image: productData.url,
        }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [idBarang]);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/");
    } else {
      const user = JSON.parse(localStorage.getItem("userData"));
     setFormData ({
      ...formData,
      nama_lengkap: user.name,
      userId: user.userId
     })
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const hideModal = () => {
    setModalShow(false);
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (formData.alamat === "" || formData.jumlah === "") {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  };
  return (
    <>
      <div className="d-flex flex-column container bg-white p-4">
        <h4 className="text-center">Formulir Jual</h4>
        <hr className="line-header" />
        <div className="row">
          {loading ? (
            <div className="image-sampah text-center">
              <Skeleton width={300} height={300} />
            </div>
          ) : (
            <div className="image-sampah text-center">
              <img
                src={formData.image === undefined ? "" : formData.image}
                alt="Gambar Sampah"
                style={{ width: "300px", height: "300px" }}
              />
            </div>
          )}

          <form onSubmit={handleClick}>
            <InputElement
              label="Nama Penjual"
              type="text"
              name="nama_lengkap"
              id="nama_lengkap"
              value={formData.nama_lengkap === undefined ? "" : formData.nama_lengkap}
              className="mb-2"
              disabled
            />
            <InputElement
              label="Nama Barang"
              type="text"
              name="nama_barang"
              id="nama_barang"
              value={
                formData.nama_barang === undefined ? "" : formData.nama_barang
              }
              className="mb-2"
              disabled
            />
            <InputElement
              label="Alamat Penjemputan *"
              type="text"
              name="alamat"
              id="alamat"
              value={formData.alamat === undefined ? "" : formData.alamat}
              onChange={handleChange}
              className="mb-2"
              required
            />
            <InputElement
              label="No Handphone *"
              type="number"
              name="nomor_hp"
              id="nomor_hp"
              value={formData.nomor_hp === undefined ? "" : formData.nomor_hp}
              onChange={handleChange}
              className="mb-2"
              required
            />
            <InputElement
              label="Harga / Kg"
              type="text"
              name="harga"
              id="harga"
              value={
                formData.harga === undefined
                  ? ""
                  : formData.harga.toLocaleString("id-ID")
              }
              className="mb-2"
              disabled
            />
            <InputElement
              label="Perkiraan Sampah (Kg) *"
              type="number"
              name="jumlah"
              id="jumlah"
              value={formData.jumlah === undefined ? "" : formData.jumlah}
              className="mb-2"
              onChange={handleChange}
              placeholder={0}
              required
            />
            <div
              className="text-end mt-5"
              style={{ fontWeight: 500, fontFamily: "inherit" }}
            >
              Total: Rp.
              {(formData.harga * formData.jumlah).toLocaleString("id-ID")}
            </div>

            <ButtonElement
              type="submit"
              className="btn btn-success"
              isLoading={false}
            >
              Jual
            </ButtonElement>
            <ButtonElement
              handleClick={() => navigate(-1)}
              type="button"
              className="btn btn-danger mx-2"
              isLoading={false}
            >
              Kembali
            </ButtonElement>
          </form>
          {modalShow && (
            <Modal
              show={modalShow}
              onHide={hideModal}
              size={"lg"}
              title={"Apakah Sudah Benar?"}
              closeButton={true}
            >
              <div className="mt-2" style={{ fontSize: "1.2rem" }}>
                <strong>Nama Penjual:</strong>{" "}
                {formData.nama_lengkap === undefined ? "" : formData.nama_lengkap}
              </div>
              <div className="mt-2" style={{ fontSize: "1.2rem" }}>
                <strong>Nama Barang:</strong>{" "}
                {formData.nama_barang === undefined ? "" : formData.nama_barang}
              </div>
              <div className="mt-2" style={{ fontSize: "1.2rem" }}>
                <strong>Alamat Penjemputan:</strong>{" "}
                {formData.alamat === undefined ? "" : formData.alamat}
              </div>
              <div className="mt-2" style={{ fontSize: "1.2rem" }}>
                <strong>Nomor HP:</strong>{" "}
                {formData.nomor_hp === undefined ? "" : formData.nomor_hp}
              </div>
              <div className="mt-2" style={{ fontSize: "1.2rem" }}>
                <strong>Harga / Kg:</strong>{" "}
                {formData.harga === undefined ? "" : formData.harga}
              </div>
              <div className="mt-2" style={{ fontSize: "1.2rem" }}>
                <strong>Tanggal:</strong>{" "}
                {moment(formData.date).format("DD MMMM YYYY")}
              </div>
              <div className="mt-2" style={{ fontSize: "1.2rem" }}>
                <strong>Perkiraan Sampah (Kg):</strong>{" "}
                {formData.jumlah === undefined ? "" : formData.jumlah}
              </div>
              <div
                className="mt-2"
                style={{
                  fontWeight: 500,
                  fontFamily: "inherit",
                  fontSize: "1.2rem",
                }}
              >
                <strong>Total Transaksi:</strong> Rp.
                {(formData.harga * formData.jumlah).toLocaleString("id-ID")}
              </div>
              <div className="d-flex align-items-center justify-content-end gap-2 p-3">
                <ButtonElement
                  type="button"
                  className="btn btn-danger"
                  handleClick={hideModal}
                >
                  Batal
                </ButtonElement>
                <form onSubmit={saveTransaksi}>
                  <ButtonElement
                    type="submit"
                    className="btn bg-success text-white"
                  >
                    Kirim
                  </ButtonElement>
                </form>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default FormJual;
