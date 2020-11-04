import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { dbService } from 'fbase';
import { limitTitle } from "functions";
import Loading from './Loading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import './YoutubeCards.css';

const YoutubeCards = () => {
    const [youtubes, setYotubes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dbService
            .collection('youtubes')
            .orderBy("createdAt", "desc")
            .limit(3)    
            .onSnapshot((snapshot) => {
                let youtubeArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
                setYotubes(youtubeArray);
            });
        setIsLoaded(true);
    }, []);
    return (
        <>
        <div data-aos="fade-up" className="youtube-cards container row">
            <Link to="/youtube" className="col-lg-12">
                <h3 className="youtube-cards-title">오성TV <FontAwesomeIcon icon={faYoutube} color="red"/> 매물</h3>
            </Link>
            {isLoaded ?
            <>
            <div className="row">
                {youtubes.map((youtube) =>
                    <div data-aos="fade-up" key={youtube.id} className="youtube-item col-lg-4 col-md-6">
                        <a href={youtube.url}><span className="btn btn-danger">유튜브로 이동</span></a>
                        <ReactPlayer url={youtube.url} className="youtube-vid" width="300px" height="250px" config={{ youtube: { playerVars: { showinfo: 1, controls: 1 } }, }} />
                        <h4>{limitTitle(youtube.title)}</h4>
                    </div>
                )} 
            </div>
            <Link data-aos="fade-up" to="/youtube" className="btn load__btn">
                <span>더보기</span>
            </Link>
            </>        
            : <Loading />}
        </div>  
        </>
    );
};

export default YoutubeCards;
