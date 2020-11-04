import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import { onReloadClick } from "functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import Navigation from 'components/Navigation';
import SearchCard from 'components/SearchCard';
import './Manage.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Manage = ({userObj}) => {
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
                {products.map((product) => (
                    <SearchCard
                    key={product.id}
                    productObj={product}
                    isOwner={product.creatorId === userObj.uid}
                    />
                ))}
        </div>
        <div className="upload-back col-lg-12">
            <Link to="/" className="btn btn-md">
                <FontAwesomeIcon icon={faUndo} color={"#0275d8"} size="1x" /> 돌아가기
            </Link>
        </div>
        </>
    );
};

export default Manage;
