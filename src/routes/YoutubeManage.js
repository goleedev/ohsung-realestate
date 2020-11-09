import React, { useState, useEffect } from 'react';
import { dbService } from "fbase";
import { onReloadClick } from "Functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Navigation from 'components/Navigation';
import YoutubeSearchCard from 'components/YoutubeSearchCard';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';

const YoutubeManage = () => {
    const [youtubes, setYoutubes] = useState([]);
    useEffect(() => {
        dbService
            .collection('youtubes')
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                let youtubeArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
                setYoutubes(youtubeArray);
            });
    }, []);
    return (
        <>
        <Navigation />  
        <div className="container manage row">
            <h3 onClick={onReloadClick} className="title col-lg-12">
                오성TV <FontAwesomeIcon icon={faYoutube} color="red" /> 매물 관리
            </h3>
            <div className="upload-back col-lg-12">
                <Link to="/login/manage" className="link-youtube btn btn-md">
                    <span>매물 관리?</span>
                </Link>
                <Link to="/" className="btn btn-md">
                    <FontAwesomeIcon icon={faUndo} color={"#0275d8"} size="1x" /> 돌아가기
                </Link>
            </div>
            {youtubes.map((youtube) => (
                <YoutubeSearchCard
                key={youtube.id}
                productObj={youtube}
                />
            ))}
        </div>
        <FooterLink />
        <Footer />    
        </>
    );
};

export default YoutubeManage;