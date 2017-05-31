import React, { Component } from 'react';
import _ from 'lodash';

class MigasPan extends Component {
  constructor(props) {
    super(props);
    this.migas = this.migas.bind(this);
  }

  migas() {
    let result = [];

    if (!_.isEmpty(this.props.detail)) {
      this.props.detail.map((element, index) => {
        if(index === 0) {
          result.push(
            <div>
              <span key={ _.uniqueId() }> { element } </span>
            </div>
          );
        } else {
          result.push(
            <div key={ _.uniqueId() }>
              <span> > </span>
              <span> { element } </span>
            </div>
          );
        }
      });
    }

    return result;
  }

  render() {
    return (
      <div className="col-sm-8 col-sm-offset-2 breadcumb-container">
        <div className="migas">
          {
            this.migas()
          }
        </div>
      </div>
    );
  }
}

export default MigasPan;
