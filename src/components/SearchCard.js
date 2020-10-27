import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import './SearchCard.css';

const SearchCard = ({ productObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newProduct, setNewProduct] = useState(productObj.title);
    const [newContent, setNewContent] = useState(productObj.title);
    const [newPrice, setNewPrice] = useState(productObj.title);
    const [newRegion, setNewRegion] = useState(productObj.title);
    const [newType, setNewType] = useState(productObj.title);
    const [newSize, setNewSize] = useState(productObj.title);
    const [newStructure, setNewStructure] = useState(productObj.title);
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
        setEditing((prev) => !prev);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`products/${productObj.id}`).update({
            title: newProduct,
            content: newContent,
            price: newPrice,
            region: newRegion,
            type: newType,
            size: newSize,
            structure: newStructure,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name == "title") {
            setNewProduct(value);
        } else if (name == "content") {
            setNewContent(value);
        } else if (name == "price") {
            setNewPrice(value);
        } else if (name == "type") {
            setNewType(value);
        } else if (name == "region") {
            setNewRegion(value);
        } else if (name == "size") {
            setNewSize(value);
        } else if (name == "structure") {
            setNewStructure(value);
        }
    };
        
    return (
    <div className="search-card-item col-lg-4 col-md-6">
        {editing ? (
        <>
            <form onSubmit={onSubmit} className="col-lg-12">
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
                <input
                type="text"
                name="type"            
                placeholder="종류을 수정 하세요."
                value={newType}
                onChange={onChange}
                className="formInput"
                />
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
                <div className="">
                    <input type="submit" value="수정 완료" className="formBtn" />
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        취소
                    </span>         
                </div>  
            </form>
        </>            
        ) : (
        <>
        <div className="">          
            <h4>{productObj.title}</h4>
            {productObj.attachmentUrl && <img src={productObj.attachmentUrl} />}
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
        </>
        )}
    </div>
    )
}

export default SearchCard;
