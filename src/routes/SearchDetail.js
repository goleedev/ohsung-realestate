import React, { useState, useEffect } from 'react';
import './SearchDetail.css';

const SearchDetail = ( props ) => {
    const data = props.history.location.state;
    console.log(data.product.title);
    
    return (
        <div>
            <h2></h2>
        </div>
    )
}

export default SearchDetail;