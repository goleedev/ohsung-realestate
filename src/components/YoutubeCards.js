import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { dbService } from 'fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import './YoutubeCards.css';
import Loading from './Loading';

const YoutubeCards = () => {
    const [youtubes, setYotubes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
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
        setIsLoaded(true);
    }, []);
    const limitTitle = (title, limit = 25) => {
        const newTitle = [];
        if (title.length > limit) {
            title.split(' ').reduce((acc, cur) => {
                if (acc + cur.length <= limit) {
                    newTitle.push(cur);
                }
                return acc + cur.length;
            }, 0);
    
            return `${newTitle.join(' ')} ...`;
        }
        return title;
    };
    const onReloadClick = async () => {
        await window.location.reload();
    };
    return (
        <>
            <div data-aos="fade-up" className="youtube-cards container row">
                <h3 className="youtube-cards-title col-lg-12" onClick={onReloadClick}>오성TV <FontAwesomeIcon icon={faYoutube} color="red"/> 매물</h3>
                {isLoaded ?
                <>
                <div className="row">
                    {youtubes.map((youtube) =>
                        <div data-aos="fade-up" key={youtube.id} className="youtube-item col-lg-4 col-md-6">
                            <a href={youtube.url}><span className="btn btn-danger">유튜브로 이동</span></a>
                            <ReactPlayer url={youtube.url} className="youtube-vid" width="300px" height="200px" config={{ youtube: { playerVars: { showinfo: 1, controls: 1 } }, }} />
                            <h4>{limitTitle(youtube.title)}</h4>
                        </div>
                    )} 
                    <Link data-aos="fade-up" to="/youtube" className="btn load__btn col-lg-3 col-md-12">
                        <span>더보기</span>
                    </Link>
                </div>
                </>        
                : <Loading />}
            </div>  
        </>
    )
}

export default YoutubeCards;
