import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "react-bootstrap";
import './Navigation.css';

const Navigation = () => {
    function openNav() {
        document.getElementById("mySidenav").style.width = "300px";
        document.getElementById("main").style.marginLeft = "300px";
    };
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    };
    return (
        <div className="container">
            <a className="navbar-brand" href="/">
                <h1>오성 부동산</h1>
            </a>
            <Nav className="nav-items">
                <Nav.Item>
                    <Link className="nav-link" to="/about">오성부동산 소개</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/youtube">오성TV</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/search">매물검색</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className="nav-link" to="/contact">문의하기</Link>
                </Nav.Item>
                <Nav.Item>
                    <a href="tel:0415233303" className="nav-link nav-phone">
                        <FontAwesomeIcon icon={faPhoneVolume} />
                        <span>041-523-3303</span>
                    </a> 
                </Nav.Item>
            </Nav>
            <div id="mySidenav" className="sidenav">
                {/* // eslint-disable-next-line */}
                <a className="nav-link" href="javascript:void(0)" className="closebtn" onClick={closeNav}>×</a>
                <Link className="nav-link" to="/about">오성부동산 소개</Link>
                <Link className="nav-link" to="/youtube">오성TV</Link>
                <Link className="nav-link" to="/search">매물검색</Link>
                <Link className="nav-link" to="/contact">문의하기</Link>
                <a href="tel:0415233303" className="nav-link nav-phone">
                    <FontAwesomeIcon icon={faPhoneVolume} />
                    <span>041-523-3303</span>
                </a>
            </div>
            <div id="main">
                <span onClick={openNav}>☰</span>
            </div>
        </div>
    );
};

export default Navigation;
