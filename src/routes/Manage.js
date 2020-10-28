import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import Navigation from 'components/Navigation';
import SearchCard from 'components/SearchCard';
import './Manage.css';

const Manage = ({userObj}) => {
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
        </>
    )
}

export default Manage;
