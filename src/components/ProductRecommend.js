import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import './ProductRecommend.css';

const ProductRecommend = () => {
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
    const onReloadClick = async () => {
        await window.location.reload();
    };
    return (
        <>
           <div data-aos="fade-up" className="product-recom container">
                <h3 onClick={onReloadClick} className="product-recom-title col-lg-12">추천물건</h3>
                <nav className="product-recom-nav col-lg-12">
                    <span id="주택" onClick={onClick}>다가구/상가주택</span>
                    <span id="상가건물" onClick={onClick}>상가건물</span>
                    <span id="토지" onClick={onClick}>토지</span>
                    <span id="공장/창고" onClick={onClick}>공장/창고</span>
                    <span id="전원주택" onClick={onClick}>전원주택</span>
                    <span id="아파트" onClick={onClick}>아파트</span>
                </nav>
                <div className="row">
                    {products.map((product) => 
                        <div data-aos="fade-up" key={product.id} className="product-recom-item col-lg-4 col-md-6">
                            <p>{product.type} | {product.price} | {product.size}</p>
                            <img src={product.attachmentUrl} className="product-recom-item" />
                            <h4>{product.title}</h4>
                            <p>{product.type} | {product.price} | {product.size}</p>
                        </div>
                    )}    
                </div>
            </div> 
        </>
    )
}

export default ProductRecommend;
