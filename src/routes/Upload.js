import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Navigation from 'components/Navigation';
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
        sold: sold,
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
                  type="number"
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
                  <input
                  className="factoryInput__input col-sm-6"
                  value={type}
                  onChange={onChange}
                  type="text"
                  name="type"
                  placeholder="종류"
                  />
                  <input
                  className="factoryInput__input col-sm-6"
                  value={size}
                  onChange={onChange}
                  type="number"
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
                  />
                  <div className="checkbox">
                    <label htmlFor="sold">
                      <input
                      className="factoryInput__radio col-sm-3"
                      value={sold}
                      id="sold"
                      onChange={onChange}
                      type="checkbox"
                      name="sold"
                      />
                      계약완료
                    </label>
                  </div>
                </div>                
                <input type="submit" value="&rarr;" className="factoryInput__arrow" value="업로드"/>
              </div>
            </form>
          </div>
        </>
    )
}

export default Upload;
