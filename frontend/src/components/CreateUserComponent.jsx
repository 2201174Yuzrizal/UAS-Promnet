import React, { Component } from "react";
import Swal from "sweetalert2";
import { IoIosSave } from "react-icons/io";
import { BsExclamationOctagonFill } from "react-icons/bs";
import UserService from "../services/UserService";

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      date: "",
      description: "",
      amount: "",
      status: "",
      receiver: "",
      jk: "",
      no_telp: "",
      address: "",
      isFormValid: true,
    };

    this.changeDateHandler = this.changeDateHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeAmountHandler = this.changeAmountHandler.bind(this);
    this.changeStatusHandler = this.changeStatusHandler.bind(this);
    this.changeReceiverHandler = this.changeReceiverHandler.bind(this);
    this.changeJKHandler = this.changeJKHandler.bind(this);
    this.changeNoTelpHandler = this.changeNoTelpHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
  }

  // step 3
  componentDidMount() {
    if (this.state.id === "_add") {
      this.setState({
        status: "debit",
        jk: "L",
      });
    } else {
      UserService.getUserById(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
          date: user.date,
          description: user.description,
          amount: user.amount,
          status: user.status,
          receiver: user.receiver,
          jk: user.jk,
          no_telp: user.no_telp,
          address: user.address,
        });
      });
    }
  }
  saveOrUpdateUser = (e) => {
    e.preventDefault();

    if (!this.isFormValid()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silakan lengkapi semua field sebelum menyimpan.",
      });
      return;
    }

    let user = {
      date: this.state.date,
      description: this.state.description,
      amount: this.state.amount,
      status: this.state.status,
      receiver: this.state.receiver,
      jk: this.state.jk,
      no_telp: this.state.no_telp,
      address: this.state.address,
    };
    console.log("user => " + JSON.stringify(user));

    // step 5
    if (this.state.id === "_add") {
      UserService.createUser(user).then((res) => {
        // Show success notification
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: " Transaksi Kamu Sudah diSave",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          this.props.history.push("/users");
        }, 1500);
      });
    } else {
      UserService.updateUser(user, this.state.id).then((res) => {
        // Show success notification
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Transaksi Kamu Sudah diUpdate",
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirect to "/users" after a delay (1.5 seconds)
        setTimeout(() => {
          this.props.history.push("/users");
        }, 1500);
      });
    }
  };

  deleteUser = (id) => {
    // Menampilkan modal konfirmasi
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Transaksi ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      // Jika pengguna mengonfirmasi penghapusan
      if (result.isConfirmed) {
        // Menampilkan modal konfirmasi kedua sebelum menghapus dari database
        Swal.fire({
          title: "Konfirmasi Kedua",
          text: "Apakah kamu yakin ingin menghapus data ini dari database?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then((secondResult) => {
          // Jika konfirmasi kedua berhasil, lakukan penghapusan dari database
          if (secondResult.isConfirmed) {
            UserService.deleteUser(id)
              .then(() => {
                this.showSuccessNotification("Transaksi berhasil dihapus");

                // Redirect setelah penghapusan
                this.props.history.push("/users");
              })
              .catch((error) => {
                console.error("Error deleting user:", error);
                this.showErrorNotification(
                  "Terjadi kesalahan saat menghapus transaksi."
                );
              });
          }
        });
      }
    });
  };

  isFormValid = () => {
    const {
      date,
      description,
      amount,
      status,
      receiver,
      jk,
      no_telp,
      address,
    } = this.state;

    return (
      date &&
      description &&
      amount &&
      status &&
      receiver &&
      jk &&
      no_telp &&
      address
    );
  };

  changeDateHandler = (event) => {
    this.setState({ date: event.target.value });
  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changeAmountHandler = (event) => {
    this.setState({ amount: event.target.value });
  };

  changeStatusHandler = (event) => {
    console.log(event.target.value);
    this.setState({ status: event.target.value });
  };

  changeReceiverHandler = (event) => {
    this.setState({ receiver: event.target.value });
  };

  changeJKHandler = (event) => {
    console.log(event.target.value);
    this.setState({ jk: event.target.value });
  };

  changeNoTelpHandler = (event) => {
    this.setState({ no_telp: event.target.value });
  };

  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };

  cancel() {
    this.props.history.push("/api/report");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Transaksi</h3>;
    } else {
      return <h3 className="text-center">Update Transaksi</h3>;
    }
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-8 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                {!this.state.isFormValid && (
                  <div className="alert alert-danger" role="alert">
                    Silakan lengkapi semua field sebelum menyimpan.
                  </div>
                )}
                <form>
                  <div className="form-group">
                    <label> Tanggal Transaksi: </label>
                    <input
                      type="date"
                      placeholder="Tanggal Transaksi"
                      name="date"
                      className="form-control"
                      value={this.state.date}
                      onChange={this.changeDateHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Deskripsi: </label>
                    <input
                      placeholder="Deskripsi"
                      name="description"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.changeDescriptionHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Nominal Transaksi: </label>
                    <input
                      placeholder="Nominal Transaksi"
                      name="amount"
                      className="form-control"
                      value={this.state.amount}
                      onChange={this.changeAmountHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Status: </label>
                    <select
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      onChange={this.changeStatusHandler}
                    >
                      <option value="debit">Debit</option>
                      <option value="kredit">Kredit</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label> Penanggung Jawab: </label>
                    <input
                      placeholder="Nama Penanggung Jawab"
                      name="receiver"
                      className="form-control"
                      value={this.state.receiver}
                      onChange={this.changeReceiverHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Jenis Kelamin: </label>
                    <select
                      name="jk"
                      className="form-control"
                      value={this.state.jk}
                      onChange={this.changeJKHandler}
                    >
                      <option value="L">L</option>
                      <option value="P">P</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> No Telpon: </label>
                    <input
                      placeholder="Nomor Kamu Berapa ?"
                      name="no_telp"
                      className="form-control"
                      value={this.state.no_telp}
                      onChange={this.changeNoTelpHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Alamat </label>
                    <input
                      placeholder="Dimana Anda Melakukan Transaksi"
                      name="address"
                      className="form-control"
                      value={this.state.address}
                      onChange={this.changeAddressHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateUser}
                  >
                    <IoIosSave /> Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    <BsExclamationOctagonFill /> Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUserComponent;
