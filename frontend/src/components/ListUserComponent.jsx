import React, { Component } from "react";
import { MdBrowserUpdated } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaUsersViewfinder } from "react-icons/fa6";
import UserService from "../services/UserService";

class ListUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      searchText: "",
      filteredUsers: [],
    };
    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
  }

  deleteUser(id) {
    UserService.deleteUser(id).then((res) => {
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => user.id !== id),
        filteredUsers: prevState.filteredUsers.filter((user) => user.id !== id),
      }));
    });
  }
  viewUser(id) {
    this.props.history.push(`/view-user/${id}`);
  }
  editUser(id) {
    this.props.history.push(`/add-user/${id}`);
  }
  onChangeSearchText(event) {
    const searchText = event.target.value;
    this.setState({ searchText }, () => {
      // Update the filteredUsers state in real-time
      const filteredUsers = this.state.users.filter((user) => {
        return (
          user.date.toLowerCase().includes(searchText.toLowerCase()) ||
          user.description.toLowerCase().includes(searchText.toLowerCase()) ||
          user.amount.toLowerCase().includes(searchText.toLowerCase()) ||
          user.status.toLowerCase().includes(searchText.toLowerCase()) ||
          user.receiver.toLowerCase().includes(searchText.toLowerCase()) ||
          user.jk.toLowerCase().includes(searchText.toLowerCase()) ||
          user.no_telp.toLowerCase().includes(searchText.toLowerCase()) ||
          user.address.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      this.setState({ filteredUsers });
    });
  }

  componentDidMount() {
    UserService.getUsers().then((res) => {
      if (res.data == null) {
        this.props.history.push("/add-user/_add");
      }
      this.setState({ users: res.data, filteredUsers: res.data });
    });
  }

  addUser() {
    this.props.history.push("/add-user/_add");
  }

  render() {
    return (
      <div>
        <br></br>
        <h2 className="text-center">List Transaksi</h2>
        <br></br>
        <div style={{ fontSize: "13px" }}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="searchText">Search:</label>
                <input
                  type="text"
                  placeholder="Apa Yang Mau Kamu Cari ?"
                  className="form-control"
                  id="searchText"
                  value={this.state.searchText}
                  onChange={this.onChangeSearchText}
                />
              </div>
            </div>
          </div>

          <br></br>

          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "1%", textAlign: "center" }}>ID</th>
                  <th style={{ width: "30%", textAlign: "center" }}>Tanggal</th>
                  <th style={{ width: "30%", textAlign: "center" }}>
                    Deskripsi
                  </th>
                  <th style={{ width: "1%", textAlign: "center" }}>
                    Nominal Transaksi
                  </th>
                  <th style={{ width: "1%", textAlign: "center" }}>Status</th>
                  <th style={{ width: "1%", textAlign: "center" }}>
                    Penangung Jawab
                  </th>
                  <th style={{ width: "1%", textAlign: "center" }}>
                    Jenis Kelamin
                  </th>
                  <th style={{ width: "1%", textAlign: "center" }}>
                    No Telpon
                  </th>
                  <th style={{ width: "30%", textAlign: "center" }}>Alamat</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.date}</td>
                    <td>{user.description}</td>
                    <td>{user.amount}</td>
                    <td>{user.status}</td>
                    <td>{user.receiver}</td>
                    <td>{user.jk}</td>
                    <td>{user.no_telp}</td>
                    <td>{user.address}</td>
                    <td>
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={() => this.editUser(user.id)}
                          className="btn btn-info"
                          style={{ color: "black", backgroundColor: "#FFA200" }}
                        >
                          <MdBrowserUpdated />
                          Update
                        </button>
                        <button
                          style={{ marginLeft: "10px", color: "black" }}
                          onClick={() => this.deleteUser(user.id)}
                          className="btn btn-danger"
                        >
                          <MdDelete />
                          Delete
                        </button>
                        <button
                          style={{
                            marginLeft: "10px",
                            color: "black",
                            backgroundColor: "#FFA200",
                          }}
                          onClick={() => this.viewUser(user.id)}
                          className="btn btn-info"
                        >
                          <FaUsersViewfinder /> View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-md-7 d-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={this.addUser}
                style={{ color: "black", backgroundColor: "#FFA200" }}
              >
                Add Transaksi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListUserComponent;
