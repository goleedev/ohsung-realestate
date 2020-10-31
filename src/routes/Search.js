import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { limitNumber, limitTitle, onReloadClick } from 'functions';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Loading from 'components/Loading';
import Navigation from 'components/Navigation';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import soldPic from '../images/sold.png';
import 'routes/Search.css';

const Search = () => {
    const [products, setProducts] = useState([]);
    const [productObj, setProductObj] = useState({});
    const [tags, setTags] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [searchInput, setSearchInput] = useState("");
    
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
            })
        setIsLoaded(true);
    }, []);
    const onClick = async(event) => {
        const {
            target: { id },
        } = event;
        await dbService
                .collection('products')
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
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setSearchInput(value);
    };
    const onSubmit = async() => {
        await dbService
                .collection('products')
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
    };
    function MyVerticallyCenteredModal(props) {
        setProductObj({});
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {productObj.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{productObj.content}</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
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
                    <>
                    <div onClick={() => setModalShow(true)} data-toggle="modal" data-target="#exampleModalCenter" data-aos="fade-up" key={product.id} className="product-recom-item col-lg-4 col-md-6">
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
                        <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        product={() => setProductObj(product)}            
                        />     
                    </div>
                    </>
                    )}   
                </div>
            </>
            : <Loading />}
        </div> 
        <FooterLink/>
        <Footer/>
        </>
    );
};

export default Search;