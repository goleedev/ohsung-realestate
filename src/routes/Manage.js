import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import { onReloadClick } from "Functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Navigation from 'components/Navigation';
import SearchCard from 'components/SearchCard';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import './Manage.css';

const Manage = ({ userObj }) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        dbService
            .collection('products')
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                let productArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
                setProducts(productArray);
            });
    }, []);
    return (
        <>
        <Navigation />  
        <div className="container manage row">
            <h3 onClick={onReloadClick} className="title col-lg-12">매물 관리</h3>
            <div className="upload-back col-lg-12">
                <Link to="/login/manage/youtube" className="link-youtube btn btn-md">
                    <span>오성TV 매물 관리?</span>
                </Link> 
                <Link to="/" className="btn btn-md">
                    <FontAwesomeIcon icon={faUndo} color={"#0275d8"} size="1x" /> 돌아가기
                </Link>
            </div>
                { products.map((product) => (
                    <SearchCard
                    key={product.id}
                    productObj={product}
                    />
                ))}
        </div>
        <FooterLink />
        <Footer />    
        </>
    );
};

export default Manage;
