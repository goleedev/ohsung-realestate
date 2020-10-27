import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import Navigation from 'components/Navigation';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import 'routes/Search.css';

const Search = ({ userObj }) => {
    const [products, setProducts] = useState([]);
    let items = dbService.collection("products");
    useEffect(() => {
        items
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                const productArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productArray);
            });
    }, []);
    const onReloadClick = async() => {
        await window.location.reload();
    }
    return (
        <>  
            <Navigation/>
            <div className="search-page container">
                <h3 className="search-title" onClick={onReloadClick}>매물 검색</h3>
                <div className="search-card row">
                    {products.map((product) => 
                        <div data-aos="fade-up" key={product.id} className="search-item col-lg-4 col-md-6">
                            <span></span>
                            {product.attachmentUrl && <img src={product.attachmentUrl} />}
                            <span>{product.price}</span>
                            <h4>{product.title}</h4>
                        </div>
                    )}
                </div>
            </div>
            <FooterLink/>
            <Footer/>
        </>
    )
}

export default Search;
