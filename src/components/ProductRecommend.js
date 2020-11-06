import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import { limitTitle } from "functions";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign, faMapMarkerAlt, faBuilding, faLayerGroup, faHome, faStore, faSnowplow, faIndustry, faHouseUser, faPhoneSquareAlt, faObjectGroup } from "@fortawesome/free-solid-svg-icons";
import Loading from './Loading';
import soldPic from '../images/sold.png';
import './ProductRecommend.css';

const ProductRecommend = () => {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    window.onload = () => {
        setIsLoaded(true);
    };
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
                        <h4><span className="product-id">매물번호-{product.number}</span>{limitTitle(product.title)}</h4>
                        <span className="product-action">추천</span>
                        {product.sold === "완료" && <img src={soldPic} className="product-sold" alt="sold"/>}
                        <img src={product.attachmentUrl} alt="product-pic"/>
                        <div className="product-recom-list">
                            <p className="product-won"><FontAwesomeIcon icon={faWonSign} /> {product.price}</p>
                            <p className="product-location"><FontAwesomeIcon icon={faMapMarkerAlt} />{product.region}</p>
                            <div className="product-detail">
                                <p className="col-xs-12 row">
                                    <span className="col-xs-6">
                                        {product.type === "주택"
                                        ? <FontAwesomeIcon icon={faHome} /> 
                                        : product.type === "상가건물"
                                        ? <FontAwesomeIcon icon={faStore} /> 
                                        : product.type === "토지"
                                        ? <FontAwesomeIcon icon={faSnowplow} />    
                                        : product.type === "공장/창고"
                                        ? <FontAwesomeIcon icon={faIndustry} />    
                                        : product.type === "전원주택"
                                        ? <FontAwesomeIcon icon={faHouseUser} />    
                                        : product.type === "아파트"
                                        ? <FontAwesomeIcon icon={faBuilding} /> 
                                        : "Error"                                                                                
                                    } {product.type}</span>
                                    <span className="col-xs-6">
                                        {product.structure === "문의"
                                        ? <FontAwesomeIcon icon={faPhoneSquareAlt} />
                                        : <FontAwesomeIcon icon={faObjectGroup} />} {product.structure}
                                    </span>
                                </p>
                                <p className="col-xs-12">
                                    <FontAwesomeIcon icon={faLayerGroup} />
                                    <span> {product.size}</span>
                                </p>
                            </div>
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
