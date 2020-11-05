import React, { useState, useEffect } from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { onReloadClick } from "functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import Loading from "components/Loading";
import Navigation from 'components/Navigation';
import './Upload.css';
import Footer from "components/Footer";
import FooterLink from "components/FooterLink";

const Upload = ({ userObj }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState("");
  const [content, setContent] = useState(""); 
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [structure, setStructure] = useState("");
  const [tag, setTag] = useState("");
  const [attachment, setAttachment] = useState("");
  const [sold, setSold] = useState(""); 
  let tags = [];
  useEffect(() => {
    setIsLoaded(true);
  }, []);
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
    };
    const productObj = {
      createdAt: Date.now(),
      creatorId: userObj.uid,
      title: product,
      content,
      price,
      region,
      type,
      size,
      structure,
      tags,
      sold,
      attachmentUrl,
    };
    await dbService
      .collection("products")
      .add(productObj);
    setProduct("");
    setContent("");
    setPrice("");
    setRegion("");
    setType("");
    setSize("");
    setStructure("");
    setSold("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "title") {
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
    } else if (name === "tag") {
      setTag(value);
    } else if (name === "structure") {
      setStructure(value);
    } else if (name === "sold") {
      setSold(value);
    }
  };
  const onTagClick = (event) => {
    event.preventDefault();
    const {
      target: { value }
    } = event;
    tags.push(value);
    setTag("");
  }
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
      { isLoaded ?
      <div className="upload container">
        <h3 onClick={onReloadClick} className="title col-lg-12">매물 업로드</h3>
        <div className="upload-back">
          <Link to="/login/upload/youtube" className="link-youtube btn btn-md">
            <span>오성TV 매물 업로드?</span>
          </Link>    
          <Link to="/" className="btn btn-md">
            <FontAwesomeIcon icon={faUndo} color={"#0275d8"} size="1x" /> 돌아가기
          </Link>
        </div>
        <form onSubmit={onSubmit} className="upload-form row">
          <div className="upload-attach col-md-6">
            <label htmlFor="attach-file" className="upload-label col-lg-12">
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
              <div className="upload-attachment col-lg-12">
                <img
                  src={attachment}
                  style={{
                    backgroundImage: attachment,
                  }}
                  alt="upload-img"
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
              autoComplete="off"
              name="title"
              placeholder="매물 이름"
              required
            />
            <input
              className="upload-input col-md-12"
              value={content}
              onChange={onChange}
              type="text"
              autoComplete="off"
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
              autoComplete="off"
              required
              placeholder="금액"
            />
            <input
              className="upload-input col-md-12"
              value={region}
              onChange={onChange}
              type="text"
              name="region"
              autoComplete="off"
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
              <option value="문의">문의</option>
            </select>
            <input
              className="upload-input col-md-12"
              value={size}
              onChange={onChange}
              type="text"
              name="size"
              autoComplete="off"
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
            <div  id="tags" className="upload-input col-md-12 row">
              <input
              value={tag}
              onChange={onChange}
              type="text"
              name="tag"
              placeholder="태그"
              autoComplete="off"
              />
              <button onClick={onTagClick}>+</button> 
            </div>
            <select value={sold} onChange={onChange} name="sold" id="sold" className="col-md-12">
              <option value="">계약 여부</option>
              <option value="미완료">미완료</option>
              <option value="완료">완료</option>
            </select>
          </div>
          <input type="submit" className="upload-arrow col-lg-12" value="업로드"/>
        </form>
      </div>
      : <Loading />}
      <FooterLink />
      <Footer />
    </>
  );
};

export default Upload;