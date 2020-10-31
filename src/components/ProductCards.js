import React, { useState } from 'react';
import { dbService } from "fbase";
import pro1 from 'images/card1.png';
import pro2 from 'images/card2.png';
import pro3 from 'images/card3.png';
import pro4 from 'images/card4.png';
import pro5 from 'images/card5.png';
import pro6 from 'images/card6.png';
import './ProductCards.css';

const ProductCards = () => {
    
    const [products, setProducts] = useState([]);
    let items = dbService.collection("products");
    const onClick = async (event) => {
        const {
            target: { id }
        } = event;
        if (id) {
            await items
                .where("type", "==", id)
                .orderBy("createdAt", "desc")
                .onSnapshot((snapshot) => {
                    let productArray = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setProducts(productArray);
                });
        }
    };
    return (
        <div data-aos="fade-up" className="product-list container row">
            <h3 className="product-title col-lg-12">매물 둘러보기</h3>
            <div id="주택" className="product-item top-row col-md-4 col-sm-6">
                <img src={pro1} alt="product-card"/>
            </div>
            <div id="상가건물" className="product-item top-row col-md-4 col-sm-6">
                <img src={pro2} alt="product-card"/>
            </div>
            <div id="토지" className="product-item top-row col-md-4 col-sm-6">
                <img src={pro3} alt="product-card"/>
            </div>
            <div id="공장/창고" className="product-item col-md-4 col-sm-6">
                <img src={pro4} alt="product-card"/>
            </div>
            <div id="전원주택" className="product-item col-md-4 col-sm-6">
                <img src={pro5} alt="product-card"/>
            </div>
            <div id="아파트" className="product-item col-md-4 col-sm-6">
                <img src={pro6} alt="product-card"/>
            </div>
        </div>
    )
}

export default ProductCards;
