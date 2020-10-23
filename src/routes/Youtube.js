import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import Navigation from 'components/Navigation';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import 'routes/Youtube.css';

const Youtube = () => {
    return (
        <>
        <Navigation />
        <div className="youtube-page container">
            <h3 className="youtube-title col-lg-12">오성TV <FontAwesomeIcon icon={faYoutube} color="red"/> 매물</h3>
        </div>
        <FooterLink/> 
        <Footer/>    
        </>
    )
}

export default Youtube;
