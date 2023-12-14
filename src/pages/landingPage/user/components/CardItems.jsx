/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { ButtonElement } from "../../../../components/elements/button";
import "./css/cardItem.css";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardItem = () => {
  const [products, setProducts] = useState([]);
  const url = `${import.meta.env.VITE_API_URL}/items`;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState({});

  const handleImageError = (productId) => {
    setImageError((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleClickJual = (productId) => {
    navigate(`form-jual/${productId}`);
  };
  return (
    <div>
      <h4 className="mt-5 text-center">Kirim Sampah</h4>
      <hr className="line-header" />
      <div className="mx-4 gap-3 row jual-sampah-section">
        {loading ? (
          <>
            <div className="card card-sampah">
              <div className="card-body d-flex gap-2">
                <div className="gambar-sampah-container text-center">
                  <Skeleton width={100} height={150} />
                </div>
                <div>
                  <Skeleton height={20} width={150} />
                  <Skeleton height={50} />
                  <Skeleton height={20} width={80} />
                  <Skeleton height={30} width={80} />
                </div>
              </div>
            </div>
            <div className="card card-sampah">
              <div className="card-body d-flex gap-2">
                <div className="gambar-sampah-container text-center">
                  <Skeleton width={100} height={150} />
                </div>
                <div>
                  <Skeleton height={20} width={150} />
                  <Skeleton height={50} />
                  <Skeleton height={20} width={80} />
                  <Skeleton height={30} width={80} />
                </div>
              </div>
            </div>
            <div className="card card-sampah">
              <div className="card-body d-flex gap-2">
                <div className="gambar-sampah-container text-center">
                  <Skeleton width={100} height={150} />
                </div>
                <div>
                  <Skeleton height={20} width={150} />
                  <Skeleton height={50} />
                  <Skeleton height={20} width={80} />
                  <Skeleton height={30} width={80} />
                </div>
              </div>
            </div>
          </>
        ) : (
          // Tampilkan data sebenarnya jika sudah dimuat
          products.map((product) => (
            <div className="card card-sampah" key={product.id}>
              <div className="card-body d-flex gap-2">
                <div className="gambar-sampah-container text-center">
                <img
                    src={imageError[product.id] ? '/notFound.jpg' : product.url}
                    className="gambar-sampah"
                    alt={`Gambar Sampah ${product.image}`}
                    onError={() => handleImageError(product.id)}
                  />
                </div>
                <div>
                  <h5 className="card-title">{product.name}</h5>
                  <p>{product.description}</p>
                  <p>Rp. {product.price}</p>
                  <ButtonElement
                    className="btn btn-success"
                    handleClick={() => handleClickJual(product.id)}
                  >
                    Jual
                  </ButtonElement>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardItem;
