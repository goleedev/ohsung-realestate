import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import Navigation from 'components/Navigation';
import { Link } from "react-router-dom/cjs/react-router-dom";
import './Upload.css';

const Upload = ({ userObj }) => {
    const [product, setProduct] = useState("");
    const [content, setContent] = useState(""); 
    const [price, setPrice] = useState("");
    const [region, setRegion] = useState("");
    const [type, setType] = useState("");
    const [size, setSize] = useState("");
    const [structure, setStructure] = useState("");
    const [attachment, setAttachment] = useState("");
    const [sold, setSold] = useState("");  
    const onSubmit = async (event) => {
      event.preventDefault();
      if (product === "" || content === "" || price === "" || region === "" || type === "" || size === "" || structure === "" ) {
        return;
      }
      let attachmentUrl = "";
      if (attachment !== "") {
        const attachmentRef = storageService
          .ref()
          .child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
      }
      const productObj = {
        title: product,
        content: content,
        price: price,
        region: region,
        type: type,
        size: size,
        structure: structure,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      };
      await dbService.collection("products").add(productObj);
      setProduct("");
      setContent("");
      setPrice("");
      setRegion("");
      setType("");
      setSize("");
      setStructure("");
      setSold(false);
      setAttachment("");
    };
    const onChange = (event) => {
      const {
        target: { name, value },
      } = event;
      if(name === "title") {
        setProduct(value);
      } else if (name === "content") {
        setContent(value);
      } else if (name === "price") {
        setPrice(value);
      } else if (name === "region") {
        setRegion(value);
      } else if (name === "type") {
        setType(value);
      } else if (name === "size") {
        setSize(value);
      } else if (name === "structure") {
        setStructure(value);
      } else if (name === "sold") {
        setSold(true);
      }
    };
    const onFileChange = (event) => {
      const {
        target: { files },
      } = event;
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
      if (Boolean(theFile)) {
        reader.readAsDataURL(theFile);
      }
    };
    const onClearAttachment = () => setAttachment("");
    const onReloadClick = async () => {
      await window.location.reload();
    };
    const [didMount, setDidMount] = useState(false); 

    useEffect(() => {
       setDidMount(true);
       return () => setDidMount(false);
    }, [])
    
    if(!didMount) {
      return null;
    }
    return (
        <>
          <Navigation />
          <div className="upload container">
            <h3 onClick={onReloadClick} className="title col-lg-12">매물 업로드</h3>
            <form onSubmit={onSubmit} className="upload-form row">
              <div className="upload-attach col-md-6">
                <label htmlFor="attach-file" className="upload-label">
                  <span>사진 추가</span>
                  <FontAwesomeIcon icon={faPlus} />
                </label>
                <input
                  id="attach-file"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  style={{
                  opacity: 0,
                  }}
                />
                {attachment && (
                  <div className="upload-attachment col-md-6">
                    <img
                        src={attachment}
                        style={{
                        backgroundImage: attachment,
                        }}
                    />
                    <div className="upload-clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                  </div>
                )}
              </div>
              <div className="upload-container row col-md-6">
                <input
                className="upload-input col-md-12"
                value={product}
                onChange={onChange}
                type="text"
                name="title"
                placeholder="매물 이름"
                required
                />
                <input
                className="upload-input col-md-12"
                value={content}
                onChange={onChange}
                type="text"
                name="content"
                required
                placeholder="매물 설명"
                />
                <input
                className="upload-input col-md-12"
                value={price}
                onChange={onChange}
                type="text"
                name="price"
                required
                placeholder="금액"
                />
                <input
                className="upload-input col-md-12"
                value={region}
                onChange={onChange}
                type="text"
                name="region"
                required
                placeholder="지역"
                />  
                <select onChange={onChange} name="type" id="type" className="col-md-12">
                  <option value="">매물 종류</option>
                  <option value="주택">주택</option>
                  <option value="상가건물">상가건물</option>
                  <option value="토지">토지</option>
                  <option value="공장/창고">공장/창고</option>
                  <option value="전원주택">전원주택</option>     
                  <option value="아파트">아파트</option>     
                </select>
                <input
                className="upload-input col-md-12"
                value={size}
                onChange={onChange}
                type="text"
                name="size"
                required
                placeholder="면적"
                />
                <input
                className="upload-input col-md-12"
                value={structure}
                onChange={onChange}
                type="text"
                name="structure"
                placeholder="구조"
                autoComplete="off"
                required 
                />
                <select value={sold} onChange={onChange} name="sold" id="sold" className="col-md-12">
                  <option value="">계약 여부</option>
                  <option value="false">미완료</option>
                  <option value="true">완료</option>
                </select>        
              </div>
              <input type="submit" value="&rarr;" className="upload-arrow col-lg-12" value="업로드"/>
            </form>
        </div>
        <div className="upload-back">
          <Link to="/login/youtube" className="link-youtube btn btn-md">
            <span>오성TV 매물 업로드?</span>
          </Link>    
          <Link to="/" className="btn btn-md">
            <FontAwesomeIcon icon={faUndo} color={"#0275d8"} size="1x" /> 돌아가기
          </Link>
        </div>
        </>
    )
}

export default Upload;
