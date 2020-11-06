import React, { useState } from "react";
import { dbService } from "fbase";
import { onReloadClick } from "functions";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import Navigation from "components/Navigation";
import FooterLink from "components/FooterLink";
import Footer from "components/Footer";
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
        await alert("정상적으로 업로드 되었습니다.");
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
        <Navigation/>        
        <div className="upload youtube-upload container">
            <h3 onClick={onReloadClick} className="title col-lg-12">
                오성TV <FontAwesomeIcon icon={faYoutube} color="red" /> 매물 업로드
            </h3>
            <form onSubmit={onSubmit} className="factoryForm col-lg-12">
                <div className="factoryInput__container">
                    <input
                    className="upload-input"
                    name="title"
                    value={title}
                    onChange={onChange}
                    type="text"
                    placeholder="매물 영상 제목"
                    autoComplete="off"
                    required    
                    />
                    <input
                    className="upload-input"
                    name="youtube"
                    value={youtube}
                    onChange={onChange}
                    type="text"
                    placeholder="매물 영상 주소"
                    autoComplete="off"
                    required    
                    />
                    <input type="submit" value="업로드" className="upload-arrow" />
                </div>
            </form>
            <div className="upload-back col-lg-12">
                <Link to="/login/upload" className="link-youtube btn btn-md">
                    <span>매물 업로드?</span>
                </Link>
                <Link to="/" className="btn btn-md">
                    <FontAwesomeIcon icon={faUndo} color={"#0275d8"} size="1x" /> 돌아가기
                </Link>
            </div>
        </div>
        <FooterLink />
        <Footer />
        </>
    );
};

export default YoutubeUpload;
