import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { dbService } from 'fbase';
import { onReloadClick } from "Functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { limitTitle } from 'Functions';
import Loading from 'components/Loading';
import Navigation from 'components/Navigation';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import 'routes/Youtube.css';

const Youtube = () => {
    const [youtubes, setYotubes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dbService
            .collection('youtubes')
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                let youtubeArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
                let newYoutubeVids = youtubeArray.slice(undefined, 12);
                setYotubes(newYoutubeVids);
            });
        setIsLoaded(true);
    }, []);
    return (
        <>
        <Navigation />
        <div className="youtube-page container row">
            <h3 className="youtube-title col-lg-12" onClick={onReloadClick}>오성TV <FontAwesomeIcon icon={faYoutube} color="red"/> 매물</h3>
            <div className="contaienr col-lg-12">
                <a className="youtube-sub" href="https://www.youtube.com/channel/UCU76Tl3OEO9l0yGeYIJO5lg?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                    더 많은 물건은 오성TV로 <FontAwesomeIcon icon={faExternalLinkAlt}/>
                </a>
            </div>
            { isLoaded ?
                <>
                { youtubes.map((youtube) =>
                    <div data-aos="fade-up" key={youtube.id} className="youtube-item col-lg-4 col-md-6">
                        <a href={youtube.url} target="_blank" rel="noopener noreferrer"><span className="btn btn-danger">유튜브로 이동</span></a>
                        <ReactPlayer url={youtube.url} className="youtube-vid" width="300px" height="250px" config={{ youtube: { playerVars: { showinfo: 1, controls: 1 } }, }} />
                        <h4>{limitTitle(youtube.title, 35)}</h4>
                    </div>
                )}
                </>
                : <Loading />}
        </div>
        <FooterLink/> 
        <Footer />  
        </>
    );
};

export default Youtube;
