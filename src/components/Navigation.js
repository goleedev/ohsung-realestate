import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    return (
        <nav className="navbar navbar-expand-lg navbar-light rounded container">
            <Link className="navbar-brand logo" to="/">
                <h1>오성 부동산</h1>
            </Link>
            <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-end`} id="navbarsExample09">
                <div className="nav-items row">
                    <Link className="nav-link" to="/about">오성부동산 소개</Link>
                    <Link className="nav-link" to="/youtube">오성TV</Link>
                    <Link className="nav-link" to="/search">매물검색</Link>
                    <Link className="nav-link" to="/contact">문의하기</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
