import Sidebar from "./components/sidebar/sidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { BsTrash3Fill } from "react-icons/bs";
import './css/user.css';
const User = () => {

  const users = [
    { id: 1, name: 'Akhmad Sugiannoor', username: 'Sugiannoor', saldo: 1000000 },
    { id: 2, name: 'Jane Doe', username: 'Doe', saldo: 120000 },
  ];
  
  return (
    <>
      <Sidebar />
      <main className="main-content-admin">
        <div className="table-responsive">   
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Username</th>
                  <th scope="col">Total Saldo</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.saldo}</td>
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
  );
};

export default User;
