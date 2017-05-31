import React from 'react';
import Header from 'components/common/header/Header';
require('../styles/app.scss');

const App = (props) => {
    return (
        <div className="full-width">
            <Header></Header>
            {props.children}
        </div>
    );
};

export default App;