import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import { limitNumber, limitTitle } from "functions";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import soldPic from '../images/sold.png';
import Loading from './Loading';
import './ProductRecommend.css';

const ProductRecommend = () => {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
    let mounted = true;
        dbService
            .collection('products')
            .orderBy("createdAt", "desc")
            .limit(6)
            .onSnapshot((snapshot) => {
                let productArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
                setProducts(productArray);
            });
        setIsLoaded(true);
        return () => (mounted = false);
    }, []);
    return (
        <>
        <div data-aos="fade-up" className="product-recom container">
            <Link to="/search" className="col-lg-12">
                <h3 className="product-recom-title">추천물건</h3>
            </Link>
            {isLoaded ?
                <>
                <div className="product-recom-container container row">
                {products.map((product) =>
                    <div data-aos="fade-up" key={product.id} className="product-recom-item col-lg-4 col-md-6">
                        <h4><span className="product-id">매물번호-{limitNumber(product.createdAt)}</span>{limitTitle(product.title)}</h4>
                        <span className="product-action">추천</span>
                        {product.sold === "완료" && <img src={soldPic} className="product-sold" alt="sold"/>}
                        <img src={product.attachmentUrl} alt="product-pic"/>
                        <div className="product-recom-list">
                            <p className="product-won"><FontAwesomeIcon icon={faWonSign} /> {product.price}</p>
                            <p className="product-location"><FontAwesomeIcon icon={faMapMarkerAlt} />{product.region}</p>
                            <p className="product-detail">
                                <span className="col-lg-4">{product.type}</span>
                                <span className="col-lg-4">{product.size}</span>
                                <span className="col-lg-4">{product.structure}</span>
                            </p>
                        </div>
                    </div>
                )}
                <div className="col-lg-12">
                    <Link data-aos="fade-up" to="/search" className="btn load__btn"> 더보기 </Link>
                </div>        
            </div>
            </>
            : <Loading />}
        </div> 
        </>
    );
};

export default ProductRecommend;
