import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <nav
            className="navbar navbar-dark bg-primary"
            style={{ backgroundColor: "#FDFD96 !important" }}
          >
            <div>
              <a
                href="/users"
                className="navbar-brand"
                style={{ color: "#000000" }}
              >
                Laporan Keuangan Dinamik
              </a>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
