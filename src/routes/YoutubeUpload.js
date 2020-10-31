import React, { useState } from "react";
import { dbService } from "fbase";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import './YoutubeUpload.css';

const YoutubeUpload = () => {
    const [youtube, setYoutube] = useState("");
    const [title, setTitle] = useState("");
    const onSubmit = async(event) => {
        event.preventDefault();
        if (title === "" || youtube === "") {
        return;
        };
        const youtubeObj = {
            title: title,
            url: youtube,
            createdAt: Date.now(),
        };
        await dbService
                .collection("youtubes")
                .add(youtubeObj);
        setTitle("");
        setYoutube("");
    };
    const onChange = (event) => {
        const {
        target: { name, value },
        } = event;
        if (name === "title") {
            setTitle(value);
        } else if (name === "youtube") {
            setYoutube(value);
        }
    };
    return (
        <>
        <div className="upload youtube-upload container">
            <h3 className="title col-lg-12">매물 업로드</h3>
            <form onSubmit={onSubmit} className="factoryForm">
                <div className="factoryInput__container">
                    <input
                    className="factoryInput__input"
                    name="title"
                    value={title}
                    onChange={onChange}
                    type="text"
                    placeholder="매물 영상 제목"
                    autoComplete="off"
                    required    
                    />
                    <input
                    className="factoryInput__input"
                    name="youtube"
                    value={youtube}
                    onChange={onChange}
                    type="text"
                    placeholder="매물 영상 주소"
                    autoComplete="off"
                    required    
                    />
                    <input type="submit" value="업로드" className="factoryInput__arrow" />
                </div>
            </form>
            <div className="factory__back">
                <Link to="/" className="btn btn-md">
                    <FontAwesomeIcon icon={faUndo} color={"#0275d8"} size="1x" /> 돌아가기
                </Link>
            </div>
        </div>
        </>
    );
};

export default YoutubeUpload;
