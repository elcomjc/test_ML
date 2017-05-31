import React, { Component } from 'react';
import { MigasPan, LogoMl, SearchInput } from './elements';

class Header extends Component {
  render () {
    return(
      <div className="container-fluid">
        <div className="row search-bar text-center">
          <div className="col-sm-12">
            <div className="col-sm-3 text-right">
              <LogoMl />
            </div>
            <div className="col-sm-8">
              <SearchInput />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
