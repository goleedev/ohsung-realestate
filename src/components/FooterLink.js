import React from 'react';
import Slider from "react-slick";
import link1 from 'images/link1.png';
import link2 from 'images/link2.png';
import link3 from 'images/link3.png';
import link4 from 'images/link4.png';
import './FooterLink.css';

const FooterLink = () => {
    return (
        <div className="container logo-slider">
            <Slider
            dots={false}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3000}
            >
                <div className="slide">
                    <a href="https://www.gov.kr/portal" target="_blank" rel="noopener noreferrer">
                        <img src={link1} alt="footer-link" />
                    </a>
                </div>
                <div className="slide">
                    <a href="http://www.iros.go.kr/PMainJ.jsp" target="_blank" rel="noopener noreferrer">
                        <img src={link2} alt="footer-link" />
                    </a>
                </div>
                <div className="slide">
                    <a href="https://www.disco.re/" target="_blank" rel="noopener noreferrer">
                        <img src={link3} alt="footer-link" />
                    </a>
                </div>
                <div className="slide">
                    <a href="http://luris.molit.go.kr/web/index.jsp" target="_blank" rel="noopener noreferrer">
                        <img src={link4} alt="footer-link" />
                    </a>
                </div>
            </Slider>
        </div>
    );
};

export default FooterLink;
