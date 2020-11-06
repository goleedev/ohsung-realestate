import React, { useState } from "react";
import ReactPlayer from "react-player";
import { dbService } from "fbase";
import { limitTitle } from "functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import './YoutubeSearchCard.css';

const YoutubeSearchCard = ({ productObj }) => {
    const [editing, setEditing] = useState(false);
    const [newYoutube, setNewYoutube] = useState(productObj.title);
    const [newUrl, setNewUrl] = useState(productObj.url);
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제 하시겠습니까?");
        if (ok) {
            await dbService.doc(`youtubes/${productObj.id}`).delete();
        }
    };
    const toggleEditing = () => {
        setNewYoutube(newYoutube);
        setNewUrl(newUrl);
        setEditing((prev) => !prev);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService
                .doc(`youtubes/${productObj.id}`)
                .update({
                    title: newYoutube,
                    url: newUrl,
                });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "youtube") {
            setNewYoutube(value);
        } else if (name === "url") {
            setNewUrl(value);
        }
    };
    return (
        <div className="search-card-item col-lg-4 col-md-6">
            {editing ? (
            <>
            <div className="search-card youtube-search-card">
                <form onSubmit={onSubmit} className="col-lg-12 product-recom-container manage-form">
                    <input
                    type="text"
                    placeholder="제목을 수정 하세요."
                    value={newYoutube}
                    name="youtube"            
                    autoFocus
                    onChange={onChange}
                    className="formInput"
                    />
                    <input
                    type="text"
                    name="url"            
                    placeholder="URL을 수정 하세요."
                    value={newUrl}
                    onChange={onChange}
                    className="formInput"
                    />         
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
            <div data-aos="fade-up" key={productObj.id} className="youtube-item">
                <a href={productObj.url}><span className="btn btn-danger">유튜브로 이동</span></a>
                <ReactPlayer url={productObj.url} className="youtube-vid" width="300px" height="250px" config={{ youtube: { playerVars: { showinfo: 1, controls: 1 } }, }} />
                <h4>{limitTitle(productObj.title, 35)}</h4>
                <div className="product__actions">
                    <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                </div> 
            </div>  
            </>
            )}
        </div>
    );
};

export default YoutubeSearchCard;
