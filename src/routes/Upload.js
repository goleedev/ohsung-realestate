import React, { useState } from "react";
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
    const [sold, setSold] = useState(false);  
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
    return (
        <>
          <Navigation />
          <div className="upload container">
            <h3 className="title col-lg-12">매물 업로드</h3>
            <form onSubmit={onSubmit} className="factoryForm">
              <div className="col-md-6">
                <label htmlFor="attach-file" className="factoryInput__label">
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
                  <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                        backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                  </div>
                )}
            </div>
            <div className="factoryInput__container col-md-6">
                <input
                className="factoryInput__input col-sm-12"
                value={product}
                onChange={onChange}
                type="text"
                name="title"
                placeholder="매물 이름"
                />
                <input
                className="factoryInput__input col-sm-12"
                value={content}
                onChange={onChange}
                type="text"
                name="content"
                placeholder="매물 설명"
                />
                <div className="factoryInput__input-middle row">
                  <input
                  className="factoryInput__input col-sm-6"
                  value={price}
                  onChange={onChange}
                  type="text"
                  name="price"
                  placeholder="금액"
                  />
                  <input
                  className="factoryInput__input col-sm-6"
                  value={region}
                  onChange={onChange}
                  type="text"
                  name="region"
                  placeholder="지역"
                  />
                </div>
                <div className="factoryInput__input-middle row">
                  <label className="label" htmlFor="type">매물 종류</label>
                  <select onChange={onChange} name="type" id="type" className="factoryInput__input col-sm-6">
                    <option value="주택">주택</option>
                    <option value="상가건물">상가건물</option>
                    <option value="토지">토지</option>
                    <option value="공장/창고">공장/창고</option>
                    <option value="전원주택">전원주택</option>     
                    <option value="아파트">아파트</option>     
                  </select>
                  <input
                  className="factoryInput__input col-sm-6"
                  value={size}
                  onChange={onChange}
                  type="text"
                  name="size"
                  placeholder="면적"
                  />
                </div>
                <div className="factoryInput__input-middle row">
                  <input
                  className="factoryInput__input col-sm-9"
                  value={structure}
                  onChange={onChange}
                  type="text"
                  name="structure"
                  placeholder="구조"
                  autoComplete="off"
                  required 
                  />
                  <div className="checkbox">
                    <label htmlFor="sold">
                      <input
                      className="factoryInput__radio col-sm-3"
                      checked={sold}
                      id="sold"
                      onChange={onChange}
                      type="checkbox"
                      name="sold"
                      autoComplete="off"
                      required    
                      />
                      계약완료
                    </label>
                  </div>
                </div>                
                <input type="submit" value="&rarr;" className="factoryInput__arrow" value="업로드"/>
              </div>
            </form>
        </div>
        <div className="factory__back">
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
