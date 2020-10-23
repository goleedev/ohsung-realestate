import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import './ProductCards.css';

const ProductCards = () => {
    const [products, setProducts] = useState([]);
    let items = dbService.collection('products');
    useEffect(() => {
        items
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
            let productArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setProducts(productArray);
        });
    }, []);
    const onClick = async(event) => {
        const {
            target: { id }
        } = event;
        if (id) {
            await items
            .where("group", "==", id)
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                let productArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
                setProducts(productArray);
            });
        }
    }
    const onReloadClick = async() => {
        await window.location.reload();
    }

    return (
        <>
           <div className="store-list container row">
                <h3 onClick={onReloadClick} className="col-lg-12">스토어</h3>
                <nav className="store-nav col-lg-12">
                    <span id="주택" onClick={onClick}>다가구/상가주택</span>
                    <span id="상가" onClick={onClick}>상가건물</span>
                    <span id="토지" onClick={onClick}>토지</span>
                    <span id="공장" onClick={onClick}>공장/창고</span>
                    <span id="전원" onClick={onClick}>전원주택</span>
                    <span id="아파트" onClick={onClick}>아파트</span>
                </nav>
                <div className="container row product-item">
                    {products.map((product) => 
                        <div key={product.id} className="col-lg-3 col-md-6">
                            <img src={product.attachmentUrl} className="store-product" />
                            <h4>{product.productTitle}</h4>
                        </div>
                    )}    
                </div>
            </div> 
        </>
    )
}

export default ProductCards;
