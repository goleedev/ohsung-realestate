import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { limitTitle } from "functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faWonSign, faMapMarkerAlt, faHome, faStore, faSnowplow, faIndustry, faHouseUser, faBuilding, faPhoneSquareAlt, faObjectGroup, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import soldPic from '../images/sold.png';
import './SearchCard.css';

const SearchCard = ({ productObj }) => {
    const [editing, setEditing] = useState(false);
    const [newNumber, setNewNumber] = useState(productObj.number);
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
        setNewNumber(newNumber);
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
                    number: newNumber,
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
        if (name === "number") {
            setNewNumber(value);
        } else if (name === "title") {
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
            <div className="search-card">
            <form onSubmit={onSubmit} className="col-lg-12 product-recom-container manage-form">
                <input
                type="text"
                placeholder="매물 번호를 수정 하세요."
                value={newNumber}
                name="number"            
                autoFocus
                onChange={onChange}
                className="formInput"
                />
                <input
                type="text"
                placeholder="제목을 수정 하세요."
                value={newProduct}
                name="title"            
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
        </div>
        </>            
        ) : (
        <> 
        <div className="product-recom-container container row">
            <div data-aos="fade-up" key={productObj.id} className="product-recom-item">
                <h4><span className="product-id">매물번호-{productObj.number}</span>{limitTitle(productObj.title)}</h4>
                <span className="product-action">추천</span>
                {productObj.sold === "완료" && <img src={soldPic} className="product-sold" alt="sold"/>}
                <img src={productObj.attachmentUrl} alt="product-pic"/>
                <div className="product-recom-list">
                    <p className="product-won"><FontAwesomeIcon icon={faWonSign} /> {productObj.price}</p>
                    <p className="product-location"><FontAwesomeIcon icon={faMapMarkerAlt} />{productObj.region}</p>
                    <div className="product-detail">
                        <p className="col-xs-12 row">
                            <span className="col-xs-6">
                                {productObj.type === "주택"
                                ? <FontAwesomeIcon icon={faHome} /> 
                                : productObj.type === "상가건물"
                                ? <FontAwesomeIcon icon={faStore} /> 
                                : productObj.type === "토지"
                                ? <FontAwesomeIcon icon={faSnowplow} />    
                                : productObj.type === "공장/창고"
                                ? <FontAwesomeIcon icon={faIndustry} />    
                                : productObj.type === "전원주택"
                                ? <FontAwesomeIcon icon={faHouseUser} />    
                                : productObj.type === "아파트"
                                ? <FontAwesomeIcon icon={faBuilding} /> 
                                : "Error"                                                                                
                            } {productObj.type}</span>
                            <span className="col-xs-6">
                                {productObj.structure === "문의"
                                ? <FontAwesomeIcon icon={faPhoneSquareAlt} />
                                : <FontAwesomeIcon icon={faObjectGroup} />} {productObj.structure}
                            </span>
                        </p>
                        <p className="col-xs-12">
                            <FontAwesomeIcon icon={faLayerGroup} />
                            <span> {productObj.size}</span>
                        </p>
                    </div>
                </div>
                <div className="product__actions">
                    <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                </div>        
            </div>
        </div>    
        </>
        )}
    </div>
    );
};

export default SearchCard;
