import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { dbService } from 'fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import './YoutubeCards.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const YoutubeCards = () => {
    const [youtubes, setYotubes] = useState([]);
    let items = dbService.collection('youtubes');
    useEffect(() => {
        items
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
            let youtubeArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            let newYoutubes = youtubeArray.slice(undefined, 3);
            setYotubes(newYoutubes);
        });
    }, []);
    const onReloadClick = async() => {
        await window.location.reload();
    }
    return (
        <>
            <div data-aos="fade-up" className="youtube-cards container row">
                <h3 className="youtube-cards-title col-lg-12" onClick={onReloadClick}>오성TV <FontAwesomeIcon icon={faYoutube} color="red"/> 매물</h3>
                <div data-aos="fade-up" className="row">
                    {youtubes.map((youtube) => 
                        <div key={youtube.id} className="youtube-item col-lg-4 col-md-6">
                            <a href={youtube.url}><span className="btn">유튜브로 이동</span></a>
                            <ReactPlayer url={youtube.url} className="youtube-vid" width="300px" height="200px" config={{ youtube: { playerVars: { showinfo: 1, controls: 1 } }, }} />
                            <h4>{youtube.title}</h4>
                        </div>
                    )}    
                    <Link to="/youtube" className="btn">
                        <span>더보기</span>
                    </Link>
                </div>
            </div>  
        </>
    )
}

export default YoutubeCards;
