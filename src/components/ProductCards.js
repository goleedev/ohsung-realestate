import React from 'react';
import './ProductCards.css';
import pro1 from 'images/product1.png';
import pro2 from 'images/product2.png';
import pro3 from 'images/product3.png';
import pro4 from 'images/product4.png';
import pro5 from 'images/product5.png';
import pro6 from 'images/product6.png';

const ProductCards = () => {
    return (
        <div data-aos="fade-up" className="product-list container row">
            <h3 className="product-title col-lg-12">매물 둘러보기</h3>
            <figure className="product-item top-row col-md-4 col-sm-6">
                <img src={pro1}/>
                <span>다가구/상가</span>
                <figcaption>주택</figcaption>
            </figure>
            <figure className="product-item top-row col-md-4 col-sm-6">
                <img src={pro2}/>
                <figcaption>상가건물</figcaption>
            </figure>
            <figure className="product-item top-row col-md-4 col-sm-6">
                <img src={pro3}/>
                <figcaption>토지</figcaption>
            </figure>
            <figure className="product-item col-md-4 col-sm-6">
                <img src={pro4}/>
                <figcaption>공장/창고</figcaption>
            </figure>
            <figure className="product-item col-md-4 col-sm-6">
                <img src={pro5}/>
                <figcaption>전원주택</figcaption>
            </figure>
            <figure className="product-item col-lg-4 col-sm-6">
                <img src={pro6}/>
                <figcaption>아파트</figcaption>
            </figure>
        </div>
    )
}

export default ProductCards;
