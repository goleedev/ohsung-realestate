import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from 'fbase';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container container">
            <div className="col-lg-12">
                <span>
                    오성공인중개사 사무소 / e-오성공인중개사 사무소<br/>
                    주소: 충청남도 천안시 서북구 두정동 545 삼보빌딩 1층<br/>
                    사업자등록번호: 879-37-00421 / 408-57-00421 | 대표자: 김기원 / 이관직<br />
                    부동산 번호: 제 44131-2019-04928호 / 제 44131-2019-05108호<br/>
                    전화: 041-523-3303 | 팩스: 041-592-1992 | 이메일: 5sungbudongsan@gmail.com<br/>
                </span>
                <Link to="/">
                    <h2 className="footer-logo logo">오성 부동산</h2>
                </Link>
                <Link className="admin-link col-lg-12" to="/login"> {authService.currentUser ? "ADMIN" : "LOGIN"} </Link>
            </div>
            <p id="copy" className="col-lg-12">
                &copy; Copyright {new Date().getFullYear()} 오성공인중개사 사무소 / e-오성공인중개사 사무소. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer;
