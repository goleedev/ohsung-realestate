import React, { useState, useEffect } from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { onReloadClick } from "Functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import Loading from "components/Loading";
import Navigation from 'components/Navigation';
import FooterLink from "components/FooterLink";
import Footer from "components/Footer";
import './Upload.css';

const Upload = ({ userObj }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [number, setNumber] = useState("");
  const [product, setProduct] = useState("");
  const [content, setContent] = useState(""); 
  const [price, setPrice] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [structure, setStructure] = useState("");
  const [tag, setTag] = useState("");
  const [attachment, setAttachment] = useState("");
  const [sold, setSold] = useState(""); 
  const [tags, setTags] = useState([]);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (number === "" || product === "" || content === "" || price === "" || priceRange === "" || region === "" || type === "" || size === "" || structure === "") {
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
      number,
      content,
      price,
      priceRange,
      region,
      type,
      size,
      structure,
      sold,
      attachmentUrl,
      tags,
    };
    await dbService
      .collection("products")
      .add(productObj);
    setNumber("");
    setProduct("");
    setContent("");
    setPrice("");
    setPriceRange(0);
    setRegion("");
    setType("");
    setSize("");
    setStructure("");
    setSold("");
    setTags([]);
    setAttachment("");
    await alert("정상적으로 업로드 되었습니다.");
  };
  const onChange = (event) => {
    let {
      target: { name, value },
    } = event;
    if (name === "number") {
      setNumber(value);
    } else if (name === "title") {
      setProduct(value);
    } else if (name === "content") {
      setContent(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "priceRange") {
      setPriceRange(Number(value));
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
    setTags(tags => tags.concat(tag));
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
            required
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{
              opacity: 0,
            }}
            />
            { attachment && (
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
            value={number}
            onChange={onChange}
            type="text"
            autoComplete="off"
            name="number"
            placeholder="매물 번호"
            required
            />
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
            <textarea
            className="upload-input upload-content col-md-12"
            value={content}
            onChange={onChange}
            type="text"
            autoComplete="off"
            name="content"
            placeholder="매물 설명"
            required
            />
            <input
            className="upload-input col-md-12"
            value={price}
            onChange={onChange}
            type="text"
            name="price"
            autoComplete="off"
            placeholder="금액"
            required
            />
            <input
            className="upload-input col-md-12"
            value={priceRange}
            onChange={onChange}
            type="number"
            step="0.01"
            min="0" 
            name="priceRange"
            autoComplete="off"
            placeholder="예) 0.0"
            required
            />
            <input
            className="upload-input col-md-12"
            value={region}
            onChange={onChange}
            type="text"
            name="region"
            autoComplete="off"
            placeholder="지역"
            required
            />
            <select onChange={onChange} name="type" id="type" className="col-md-12" required>
              <option value="">매물 종류</option>
              <option value="주택">주택</option>
              <option value="상가건물">상가건물</option>
              <option value="토지">토지</option>
              <option value="공장창고">공장 · 창고</option>
              <option value="전원주택">전원주택</option>
              <option value="아파트">아파트</option>
            </select>
            <textarea
            className="upload-input upload-size col-md-12"
            value={size}
            onChange={onChange}
            type="text"
            name="size"
            autoComplete="off"
            placeholder="면적"
            required
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
            <div onClick={onTagClick} id="tags" className="upload-input col-md-12 row">
              <input
              value={tag}
              onChange={onChange}
              type="text"
              name="tag"
              placeholder="태그"
              autoComplete="off"
              />
              <button >+</button> 
            </div>
            <select value={sold} onChange={onChange} name="sold" id="sold" className="col-md-12" required>
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