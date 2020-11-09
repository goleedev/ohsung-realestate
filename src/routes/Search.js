import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { limitTitle, onReloadClick } from 'Functions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign, faMapMarkerAlt, faBuilding, faLayerGroup, faHome, faStore, faSnowplow, faIndustry, faHouseUser, faPhoneSquareAlt, faObjectGroup } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Loading from 'components/Loading';
import NoResult from 'components/NoResult';
import Navigation from 'components/Navigation';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import soldPic from '../images/sold.png';
import 'routes/Search.css';

const Search = ( props ) => {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [noResult, setNoResult] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    // eslint-disable-next-line
    const history = useHistory();
    const data = props.history.location.state;
    window.onload = () => {
        setIsLoaded(true);
    };
    useEffect(() => {
        if (data && data.data) {
            dbService
                .collection('products')
                .where('tags', 'array-contains-any', [data.data])
                .onSnapshot((snapshot) => {
                    let productArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    }));
                    let size = snapshot.size;
                    if (size <= 0) {
                        setNoResult(true);
                    } else {
                        setNoResult(false);
                    }
                    setProducts(productArray);
                })
        } else if (data && data.group) {
            dbService
                .collection('products')
                .where("type", "==", data.group)
                .orderBy("createdAt", "desc")
                .onSnapshot((snapshot) => {
                    let productArray = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    let size = snapshot.size;
                    if (size <= 0) {
                        setNoResult(true);
                    } else {
                        setNoResult(false);
                    }
                    setProducts(productArray);
                })
        } else {
            dbService
            .collection('products')
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                let productArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
                let size = snapshot.size;
                if (size <= 0) {
                    setNoResult(true);
                } else {
                    setNoResult(false);
                }  
                    setProducts(productArray);
                })
        }
        setIsLoaded(true);
    }, [data]);
    const onClick = (event) => {
        const {
            target: { id },
        } = event;
        dbService
            .collection('products')
            .where("type", "==", id)
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                let productArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                if (productArray.length <= 0) {
                    setNoResult(true);
                } else {
                    setNoResult(false);
                }
                    setProducts(productArray);
                });
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setSearchInput(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (searchInput !== "" && searchInput !== " ") {
            await dbService
                .collection('products')
                .where('tags', 'array-contains-any', [searchInput])
                .onSnapshot((snapshot) => {
                    let productArray = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    let size = snapshot.size;
                    if (size <= 0) {
                        setNoResult(true);
                    } else {
                        setNoResult(false);
                        setProducts(productArray);
                    }
                });
        }
        setSearchInput("");
        document.querySelector("#search").reset(); 
    };
    return (
        <>
        <Navigation />
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
            <form id="search" onSubmit={onSubmit} className="input-group input-group-lg home-search search-search">
                <input
                onChange={onChange}    
                type="text"
                autoComplete="off"        
                className="form-control"
                placeholder="지역명/지하철역을 입력해주세요."
                name="search"
                value={searchInput}   
                />
                <input
                type="submit"
                value="검색"
                className="btn search-btn"
                />
            </form>
            {!isLoaded
                ? <Loading />
                : noResult    
                ? <NoResult />
                : <>
                <div className="search-container container row">
                    { products.map((product) =>
                    <>
                    <div data-aos="fade-up" key={product.id} className="product-recom-item col-lg-4 col-md-6">
                        <h4><span className="product-id">매물번호-{product.number}</span>{limitTitle(product.title)}</h4>
                        <span className="product-action">추천</span>
                        { product.sold === "완료" && <img src={soldPic} className="product-sold" alt="sold" /> }
                        <img src={product.attachmentUrl} alt="product-pic"/>
                        <div className="product-recom-list">
                            <p className="product-won"><FontAwesomeIcon icon={faWonSign} /> {product.price}</p>
                            <p className="product-location"><FontAwesomeIcon icon={faMapMarkerAlt} />{product.region}</p>
                            <div className="product-detail">
                                <p className="col-xs-12 row">
                                    <span className="col-xs-6">
                                        { product.type === "주택" || product.type === "다가구주택" ||product.type === "상가주택"
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
                                <Link
                                className="detail-more"        
                                to={{
                                pathname: `/search/${product.id}`,
                                state: {
                                    id: product.id,
                                    number: product.number,
                                    title: product.title,
                                    content: product.content,
                                    price: product.price,
                                    region: product.region,
                                    type: product.type,
                                    size: product.size,
                                    structure: product.structure,
                                    sold: product.sold,
                                    attachmentUrl: product.attachmentUrl,
                                }
                                }}>더보기
                                </Link>    
                            </div>     
                        </div>
                    </div>
                    </>
                    )} 
                </div>
            </>}
        </div> 
        <FooterLink/>
        <Footer/>
        </>
    );
};


export default Search;