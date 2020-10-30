import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import Navigation from 'components/Navigation';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import soldPic from '../images/sold.png';
import Loading from 'components/Loading';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import 'routes/Search.css';

const Search = (props, { userObj }) => {
    const history = useHistory();
    const items = dbService.collection('products');
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    
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
        })
        setIsLoaded(true);
    }, []);
    const onClick = async(event) => {
        const {
            target: { id }
        } = event;
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
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setSearchInput(value);
    };
    const onSubmit = async() => {
        await items
            .where("title", ">=", searchInput)
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                let productArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productArray);
            });
        setSearchInput("");
    }
    const onDetailClick = async(product) => {
        await history.push({
            pathname: `/search/${product.id}`,
            state: product
        });
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
    const onReloadClick = async () => {
        await window.location.reload();
    };
    return (
        <>
            <Navigation/>
            <div data-aos="fade-up" className="product-recom search-page container">
                <h3 onClick={onReloadClick} className="product-recom-title col-lg-12">물건 검색</h3>
                <nav className="product-recom-nav col-lg-12">
                    <span id="주택" onClick={onClick}>다가구/상가주택</span>
                    <span id="상가건물" onClick={onClick}>상가건물</span>
                    <span id="토지" onClick={onClick}>토지</span>
                    <span id="공장/창고" onClick={onClick}>공장/창고</span>
                    <span id="전원주택" onClick={onClick}>전원주택</span>
                    <span id="아파트" onClick={onClick}>아파트</span>
                </nav>
                <form onSubmit={onSubmit} className="input-group input-group-lg home-search search-search">
                    <input
                        onChange={onChange}    
                        type="text"
                        className="form-control col-xs-8"
                        placeholder="지역명/지하철역을 입력해주세요."
                        name="search"
                        value={searchInput}    
                    />
                    <input
                    type="submit"
                    value="검색"
                    className="btn search-btn col-xs-4" 
                    />
                </form>
                {isLoaded ?
                    <>
                    <div className="product-recom-container container row">
                    {products.map((product) =>
                        <div onClick = {(product)=> onDetailClick} data-aos="fade-up" key={product.id} className="product-recom-item col-lg-4 col-md-6">
                            <h4><span className="product-id">매물번호-{limitNumber(product.createdAt)}</span>{limitTitle(product.title)}</h4>
                            <span className="product-action">추천</span>
                            {product.sold === "완료" && <img src={soldPic} className="product-sold" />}
                            <img src={product.attachmentUrl} />
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
                </div>
                </>
                : <Loading />}
            </div> 
            <FooterLink/>
            <Footer/>
        </>
    )
}

export default Search;
