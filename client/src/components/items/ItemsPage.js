import React from 'react';
import {connect} from 'react-redux';
import ItemRow from 'components/items/ItemRow';
import MigasPan from 'components/common/header/elements/MigasPan';
import  * as itemActions from 'actions/itemActions';

class Item extends React.Component {
    constructor (props) {
        super(props);
        this.queryParam = this.props.location.query.search;
    }

    componentWillMount () {
        this.props.getItems(this.queryParam);
    }

    componentWillReceiveProps (newProps) {
        if (newProps.location.query.search !== this.queryParam) {
            this.queryParam = newProps.location.query.search;
            this.props.getItems(this.queryParam);
        }
    }

    render () {
        let renderList = false;
        if(this.props.items.items.items) {
            renderList = true;
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <MigasPan detail={this.props.items.items.categories} />
                </div>
                <div className="row"> 
                    <div className="col-sm-8 col-sm-offset-2 bg-white items-container">
                        {renderList &&
                            this.props.items.items.items.map((item) => 
                                <ItemRow className="item-row" item={item}></ItemRow>
                            )
                        }
                        {!renderList &&
                            <div className="text-center">
                                <h2>Buscando...</h2>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.items
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        getItems: query => dispatch(itemActions.getItems(query))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item);