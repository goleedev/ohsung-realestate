import React from 'react';
import { Link } from 'react-router-dom';
import link1 from 'images/link1.png';
import link2 from 'images/link2.png';
import link3 from 'images/link3.png';
import link4 from 'images/link4.png';
import './FooterLink.css';

const FooterLink = () => {

    return (
        <>
        <div className="footer-links container row">
            <Link className="col-sm-3" to="https://www.gov.kr/portal/main">
                <img
                className="footer-link"
                src={link1}
                alt="First slide"
                />
            </Link>
            <Link className="col-sm-3" to="http://www.iros.go.kr/PMainJ.jsp">
                <img
                className="footer-link"
                src={link2}
                alt="Second slide"
                />
            </Link>
            <Link className="col-sm-3" to="https://www.disco.re/">
                <img
                className="footer-link"
                src={link3}
                alt="Third slide"
                />
            </Link>
            <Link className="col-sm-3" to="http://luris.molit.go.kr/web/index.jsp">
                <img
                className="footer-link"
                src={link4}
                alt="Fourth slide"
                />
            </Link>
        </div>
        </>
    )
}

export default FooterLink;
