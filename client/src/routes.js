import React from 'react';
import {Route} from 'react-router';
import App from 'components/App';
import ItemsPage from 'components/items/ItemsPage';
import ItemDetail from 'components/items/ItemDetail';

export default (
    <Route path="/" component={App}>
        <Route path="/items" component={ItemsPage} />
        <Route path="/items/:id" component={ItemDetail} />
    </Route>
);
