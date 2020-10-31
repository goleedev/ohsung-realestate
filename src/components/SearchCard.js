import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { limitTitle } from "functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faWonSign, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import soldPic from '../images/sold.png';
import './SearchCard.css';

const SearchCard = ({ productObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newProduct, setNewProduct] = useState(productObj.title);
    const [newContent, setNewContent] = useState(productObj.content);
    const [newPrice, setNewPrice] = useState(productObj.price);
    const [newRegion, setNewRegion] = useState(productObj.region);
    const [newType, setNewType] = useState(productObj.type);
    const [newSize, setNewSize] = useState(productObj.size);
    const [newStructure, setNewStructure] = useState(productObj.structure);
    const [newSold, setNewSold] = useState(productObj.sold);
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제 하시겠습니까?");
        if (ok) {
            await dbService.doc(`products/${productObj.id}`).delete();
            await storageService.refFromURL(productObj.attachmentUrl).delete();
        }
    };
    const toggleEditing = () => {
        setNewProduct(newProduct);
        setNewContent(newContent);
        setNewPrice(newPrice);
        setNewRegion(newRegion);
        setNewType(newType);
        setNewSize(newSize);
        setNewStructure(newStructure);
        setNewSold(newSold)
        setEditing((prev) => !prev);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService
                .doc(`products/${productObj.id}`)
                .update({
                    title: newProduct,
                    content: newContent,
                    price: newPrice,
                    region: newRegion,
                    type: newType,
                    size: newSize,
                    structure: newStructure,
                    sold: newSold,
                });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "title") {
            setNewProduct(value);
        } else if (name === "content") {
            setNewContent(value);
        } else if (name === "price") {
            setNewPrice(value);
        } else if (name === "type") {
            setNewType(value);
        } else if (name === "region") {
            setNewRegion(value);
        } else if (name === "size") {
            setNewSize(value);
        } else if (name === "structure") {
            setNewStructure(value);
        } else if (name === "sold") {
            setNewSold(value);
        }
    };
    return (
    <div className="search-card-item col-lg-4 col-md-6">
        {editing ? (
            <>
            <form onSubmit={onSubmit} className="col-lg-12 product-recom-container manage-form">
                <input
                type="text"
                placeholder="제목을 수정 하세요."
                value={newProduct}
                name="title"            
                autoFocus
                onChange={onChange}
                className="formInput"
                />
                <input
                type="text"
                name="content"            
                placeholder="설명을 수정 하세요."
                value={newContent}
                onChange={onChange}
                className="formInput"
                />
                <input
                type="text"
                name="price"            
                placeholder="금액을 수정 하세요."
                value={newPrice}
                onChange={onChange}
                className="formInput"
                />
                <select value={newType} onChange={onChange} name="type" id="type" className="formInput">
                    <option value="">매물 종류 수정</option>
                    <option value="주택">주택</option>
                    <option value="상가건물">상가건물</option>
                    <option value="토지">토지</option>
                    <option value="공장/창고">공장/창고</option>
                    <option value="전원주택">전원주택</option>     
                    <option value="아파트">아파트</option>     
                </select>
                <input
                type="text"
                name="region"            
                placeholder="지역을 수정 하세요."
                value={newRegion}
                onChange={onChange}
                className="formInput"
                />
                <input
                type="text"
                name="size"            
                placeholder="면적을 수정 하세요."
                value={newSize}
                onChange={onChange}
                className="formInput"
                />
                <input
                type="text"
                name="structure"            
                placeholder="구조를 수정 하세요."
                value={newStructure}
                onChange={onChange}
                className="formInput"
                />  
                <select value={newSold} onChange={onChange} name="sold" id="sold" className="formInput">
                    <option value="">계약 여부 수정</option>
                    <option value="미완료">미완료</option>
                    <option value="완료">완료</option>
                </select>          
                <div>
                    <input type="submit" value="수정 완료" className="formBtn" />
                    <p onClick={toggleEditing} className="formBtn cancelBtn">
                        취소
                    </p>         
                </div>  
            </form>
            </>            
            ) : (
            <>
            <div className="product-recom-container container row">
                <div data-aos="fade-up" key={productObj.id} className="product-recom-item">
                    <h4>{limitTitle(productObj.title)}</h4>
                    <span className="product-action">추천</span>
                    {productObj.sold === "완료" && <img src={soldPic} className="product-sold" alt="sold"/>}
                    <img src={productObj.attachmentUrl} alt="product-pic"/>
                    <div className="product-recom-list">
                        <p className="product-won"><FontAwesomeIcon icon={faWonSign} /> {productObj.price}</p>
                        <p className="product-location"><FontAwesomeIcon icon={faMapMarkerAlt} />{productObj.region}</p>
                        <p className="product-detail">
                            <span className="col-lg-4">{productObj.type}</span>
                            <span className="col-lg-4">{productObj.size}</span>
                            <span className="col-lg-4">{productObj.structure}</span>
                        </p>
                    </div>
                    {isOwner && (
                        <div className="product__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}            
                </div>
            </div>    
            </>
            )}
        </div>
    );
};

export default SearchCard;
