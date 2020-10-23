import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import './YoutubeCards.css';

const YoutubeCards = ({ userObj }) => {
    return (
        <>
            <div className="youtube-cards container row">
                <h3 className="youtube-cards-title col-lg-12">오성TV <FontAwesomeIcon icon={faYoutube} color="red"/> 매물</h3>
                <div>Youtube Vid</div>
            </div>  
        </>
    )
}

export default YoutubeCards;
