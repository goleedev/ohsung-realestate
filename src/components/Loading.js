import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-container container flex-lg-column">
            <Spinner animation="border" variant="primary" className="loading" />
            <h3>영차 영차 <span role="img" aria-label="sweat">💦</span></h3>
        </div>
    );
};

export default Loading;
