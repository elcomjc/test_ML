import React, { Component } from 'react';
import { Link } from 'react-router';
const logoUrl = require('assets/Logo_ML.png');

class LogoML extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img className="logo" src={logoUrl} />
        </Link>
      </div>
    );
  }
}

export default LogoML;
