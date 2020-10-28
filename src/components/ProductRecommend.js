import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { dbService } from "fbase";
import sold from '../images/sold.png';
import './ProductRecommend.css';
import Loading from './Loading';

const ProductRecommend = () => {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    let items = dbService.collection('products');
    useEffect(() => {
        items
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
            let productArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            let newProductRecom = productArray.slice(undefined, 6);
            setProducts(newProductRecom);
        });
        setIsLoaded(true);
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
    const limitTitle = (title, limit = 20) => {
        const newTitle = [];
        if (title.length > limit) {
            title.split(' ').reduce((acc, cur) => {
                if (acc + cur.length <= limit) {
                    newTitle.push(cur);
                }
                return acc + cur.length;
            }, 0);
    
            return `${newTitle.join(' ')} ...`;
        }
        return title;
    };
    const limitNumber = (title) => {
        return title.toString().slice(-5);
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
                {isLoaded ?
                    <>
                    <div className="product-recom-container container row">
                    {products.map((product) =>
                        <div data-aos="fade-up" key={product.id} className="product-recom-item col-lg-4 col-md-6">
                            <h4><span className="product-id">매물번호-{limitNumber(product.createdAt)}</span>{limitTitle(product.title)}</h4>
                            <span className="product-action">추천</span>
                            <img src={product.attachmentUrl} />
                            <div className="product-recom-list">
                                <p className="product-won"><FontAwesomeIcon icon={faWonSign} /> {product.price}</p>
                                <p className="product-location"><FontAwesomeIcon icon={faMapMarkerAlt} />{product.region}</p>
                                <p className="product-detail">
                                    <span className="col-lg-4">{product.type}</span>
                                    <span className="col-lg-4">{product.size}</span>
                                    <span className="col-lg-4">{product.structure}</span>
                                </p>
                                {product.sold && <img src={sold} className="product-sold" />}
                            </div>
                        </div>
                    )}
                    <Link data-aos="fade-up" to="/search" className="btn load__btn col-lg-3 col-md-12">
                        <span>더보기</span>
                    </Link>
                </div>
                </>
                : <Loading />}
            </div> 
        </>
    )
}

export default ProductRecommend;
