
import Sidebar from './components/sidebar/sidebar'
import { HiOutlinePencil } from "react-icons/hi";
import { BsTrash3Fill } from "react-icons/bs";

const Transaksi = () => {
  const transaksi = [
    {
      id: 1,
      namaUser: 'John Doe',
      namaSampah: 'Plastik',
      harga: 5000,
      quantity: 2,
      tanggal: '2023-11-13',
      total: 10000,
    },
    {
      id: 2,
      namaUser: 'Jane Doe',
      namaSampah: 'Kertas',
      harga: 3000,
      quantity: 5,
      tanggal: '2023-11-14',
      total: 15000,
    },
  ];
  return (
    <>
    <Sidebar/>
    <main className="main-content-admin">
        <div className="table-responsive">   
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Nama Sampah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Total</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transaksi.map((transaksi, index) => (
                  <tr key={transaksi.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{transaksi.namaUser}</td>
                    <td>{transaksi.namaSampah}</td>
                    <td>{transaksi.harga}</td>
                    <td>{transaksi.quantity}</td>
                    <td>{transaksi.tanggal}</td>
                    <td>{transaksi.total}</td>
                    <td>
                      <button className="btn btn-warning me-2">
                        <HiOutlinePencil />
                      </button>
                      <button className="btn btn-danger">
                        <BsTrash3Fill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </main>
    </>
  )
}

export default Transaksi
