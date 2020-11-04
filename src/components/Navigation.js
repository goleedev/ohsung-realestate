import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";
import './Navigation.css';

const Navigation = () => {
    return (
        <Navbar expand="lg" className="container">
            <Navbar.Brand href="/">
                <h1>오성 부동산</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
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
                </Nav>
            </Navbar.Collapse>
            </Navbar>
    );
};

export default Navigation;
