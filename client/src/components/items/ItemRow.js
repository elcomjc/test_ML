import React, {Component} from 'react';
import { Link } from 'react-router';
import Tooltip from 'rc-tooltip';
const freeShippingUrl = require('assets/ic_shipping.png');

class ItemRow extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        let freeShipping = [];
        let price = '';
        let itemDetailUrl = '/items/' + this.props.item.id;
        if(this.props.item.free_shipping) {
            freeShipping.push(
                <Tooltip placement="right" trigger={['hover']} overlay={<span>FreeShipping</span>}><img src={freeShippingUrl} className="freeshiping-icon" alt="free_shipping" /></Tooltip>
            );
        }
        if(this.props.item.price.amount) {
            price += this.props.item.price.amount;
            if(this.props.item.price.decimals){
                price += '.'+this.props.item.price.decimals;
            }
        }

        return (
            <div className="row item-row">
                <div className="col-sm-3">
                    <Link to={itemDetailUrl}>
                        <img src={this.props.item.picture} alt=""/>
                    </Link>
                </div>
                <div className="col-sm-7">
                    <div className="row">
                        <div className="col-sm-12 item-price">
                           $ {price} {freeShipping}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 item-description">
                            <Link to={itemDetailUrl}>
                                {this.props.item.title}
                            </Link>
                        </div>
                        <div className="col-sm-12">
                            {this.props.item.condition}
                        </div>
                    </div>
                </div>
                <div className="col-sm-2">

                </div>
            </div>
        );
    }
}

export default ItemRow;