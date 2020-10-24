import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { dbService } from 'fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import Navigation from 'components/Navigation';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import 'routes/Youtube.css';

const Youtube = () => {
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
            let newYoutubeVids = youtubeArray.slice(undefined, 12);
            setYotubes(newYoutubeVids);
        });
    }, []);
    const onReloadClick = async() => {
        await window.location.reload();
    }
    return (
        <>
            <Navigation />
            <div className="youtube-page container row">
                <h3 className="youtube-title col-lg-12" onClick={onReloadClick}>오성TV <FontAwesomeIcon icon={faYoutube} color="red"/> 매물</h3>
                <div className="contaienr col-lg-12">
                    <a className="youtube-sub" href="https://www.youtube.com/channel/UCU76Tl3OEO9l0yGeYIJO5lg?sub_confirmation=1" target="_blank">
                        더 많은 물건은 오성TV로 <FontAwesomeIcon icon={faExternalLinkAlt}/>
                    </a>
                </div>
                {youtubes.map((youtube) => 
                    <div data-aos="fade-up" key={youtube.id} className="youtube-item col-lg-4 col-md-6">
                        <ReactPlayer url={youtube.url} className="youtube-vid" width="300px" height="200px" config={{ youtube: { playerVars: { showinfo: 1, controls: 1 } },}}/>
                        <h4>{youtube.title}</h4>
                    </div>
                )}    
            </div>
            <FooterLink/> 
            <Footer />  
        </>
    )
}

export default Youtube;
