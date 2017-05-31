import React, { Component } from 'react';
import {connect} from 'react-redux';
import  * as itemActions from 'actions/itemActions';

class ItemDetail extends Component {

  constructor (props) {
    super(props);
  }

  componentWillMount () {
      this.props.getItemDetail(this.props.params.id);
  }

  render () {
    let renderDetail = false;
    let price = '';
    let decimals = '00';
    if(this.props.item.item.item) {
        renderDetail = true;
    }
    if(renderDetail) {
      if(this.props.item.item.item.price.amount) {
          price += this.props.item.item.item.price.amount;
      }
      if(this.props.item.item.item.price.decimals){
          decimals = ''+this.props.item.item.item.price.decimals;
      }
    }
    return(
      <div className="container-fluid item-detail">
        <div className="row"> 
          <div className="col-sm-8 col-sm-offset-2 bg-white items-container">
            {renderDetail &&
              <div>
                <div className="row">
                  <div className="col-sm-8 item-picture-container">
                    <img src={this.props.item.item.item.picture} alt=""/>
                  </div>
                  <div className="col-sm-4">
                    <div className="row detail">
                      <div className="col-sm-12 stats">
                        {this.props.item.item.item.condition} - {this.props.item.item.item.sold_quantity} vendidos
                      </div>
                      <div className="col-sm-12 title">
                        {this.props.item.item.item.title}
                      </div>
                      <div className="col-sm-12 price">
                        $ <span>{price}<span className="decimals">{decimals}</span></span> 
                      </div>
                    </div>
                    <div className="row buy-button-container">
                      <div className="col-sm-12 text-center">
                        <button className="btn btn-md btn-primary buy-button">Comprar</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-left description-title">
                    <h2>Descripción del producto</h2>
                  </div>
                  <div className="col-sm-12 text-left description-content">
                    <div dangerouslySetInnerHTML={{ __html: this.props.item.item.item.description }}></div>
                  </div>
                </div>
              </div>
            }
            {!renderDetail &&
              <div className="row">
                <div className="col-sm-12 text-center">
                  <h2>Espere por favor...</h2>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        item: state.items
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItemDetail: itemId => dispatch(itemActions.getItemDetail(itemId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
