import './css/artikelSampah.css'
const ArtikelSampah = () => {
  return (
    <main>
      <h4 className="mt-5 text-center">Sampah Bekas</h4>
      <hr className="line-header" />
      <article className="mx-4 text-center">
        Temukan Penghasilan tambahan dari barang daur ulang melalui platform kami yang inovatif. Dengan
        fokus pada kertas HPS, kardus, kaleng, kami mengajak Anda
        untuk berpartisipasi dalam perjalanan menuju kehidupan berkelanjutan.
        Bantu kami dengan mengirimkan barang sisa Anda yang akan diolah menjadi produk-produk daur ulang.
        tetapi juga unik dan bermanfaat. Mari
        bersama-sama menciptakan perubahan positif bagi planet ini, satu langkah
        kecil pada satu waktu!
      </article>
      <div id="kirim-sampah" className="gambar-sampah row mt-5">
        <div className="col-4">
        <img className="gambar-sampah "src="src/assets/kardus.webp" alt="gambar kardus" />
        </div>
        <div className="col-4">
          <img className="gambar-sampah"src="src/assets/kertas-hps.webp" alt="kertas HPS" />
        </div>
        <div className="col-4">
          <img className="gambar-sampah"src="src/assets/kaleng-bekas.png" alt="kertas HPS" />
        </div>
      </div>
    </main>
  );
};

export default ArtikelSampah;
