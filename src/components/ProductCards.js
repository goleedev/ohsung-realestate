import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import pro1 from 'images/card1.png';
import pro2 from 'images/card2.png';
import pro3 from 'images/card3.png';
import pro4 from 'images/card4.png';
import pro5 from 'images/card5.png';
import pro6 from 'images/card6.png';
import './ProductCards.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const ProductCards = () => {
    const history = useHistory();
    const onClick = (event) => {
        const {
            target: { id }
        } = event;
        const searchInput = id;
        window.scrollTo(0, 0);
        history.push({
            pathname: '/search',
            search: `/query?${searchInput}`,            
            state: { group: searchInput }
        });
    };
    return (
        <div data-aos="fade-up" className="product-list container row col-lg-12">
            <Link to="/search" className="col-lg-12">
                <h3 className="product-title">매물 둘러보기</h3>
            </Link>
            <div className="product-item top-row col-md-4 col-sm-6">
                <img onClick={onClick} id="주택" src={pro1} alt="product-card"/>
            </div>
            <div className="product-item top-row col-md-4 col-sm-6">
                <img onClick={onClick} id="상가건물" src={pro2} alt="product-card"/>
            </div>
            <div className="product-item top-row col-md-4 col-sm-6">
                <img onClick={onClick} id="토지" src={pro3} alt="product-card"/>
            </div>
            <div className="product-item col-md-4 col-sm-6">
                <img onClick={onClick} id="공장/창고" src={pro4} alt="product-card"/>
            </div>
            <div className="product-item col-md-4 col-sm-6">
                <img onClick={onClick} id="전원주택" src={pro5} alt="product-card"/>
            </div>
            <div className="product-item col-md-4 col-sm-6">
                <img src={pro6} alt="product-card"/>
            </div>
        </div>
    )
}

export default ProductCards;
