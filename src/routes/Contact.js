import React from 'react';
import Navigation from 'components/Navigation';
import circle1 from '../images/home-circle1.png';
import circle2 from '../images/home-circle2.png';
import circle3 from '../images/home-circle3.png';
import './Contact.css';

const Contact = () => {
    const onSubmit = () => {
        document.getElementById('contact-form').reset();
    }
    const onFavoriteClick = () => {
        var title = document.title; 
        var url = window.location.href; 
        if (window.sidebar && window.sidebar.addPanel) { 
            window.sidebar.addPanel(title, url, "");
        } else if (window.opera && window.print) { 
            var elem = document.createElement('a');
            elem.setAttribute('href', url);
            elem.setAttribute('title', title);
            elem.setAttribute('rel', 'sidebar');
            elem.click();
        } else if (document.all) {
            window.external.AddFavorite(url, title);
        } else {
            alert("해당 브라우저는 Cmd(Ctrl) + D로 즐겨찾기 추가 가능합니다.");
            return true;
        }
    }
    return (
        <>
        <Navigation />
        <div className="get-in-touch container">
            <h3 className="title">문의하기</h3>
            <div className="contact-circle">
                <a href="">
                    <img src={circle1} />                
                </a>
                <a href="tel:07040428642">
                    <img src={circle2} />                
                </a>
                <span onClick={onFavoriteClick}>
                    <img src={circle3} />                
                </span>    
            </div>    
            <form className="contact-form row">
                <div className="form-field col-lg-6">
                    <input name="name" id="name" className="input-text js-input" type="text" required />
                    <label className="label" htmlFor="name">성함</label>
                </div>
                <div className="form-field col-lg-6">
                    <select name="options" id="options" className="input-text js-input">
                        <option value=""></option>
                        <option value="shipping">매물 구하기</option>
                        <option value="refund">매물 팔기</option>
                        <option value="class">매물 투어하기</option>
                        <option value="etc">기타 문의</option>     
                    </select>
                    <label className="label" htmlFor="option">문의 사항</label>
                </div>    
                <div className="form-field col-lg-7">
                    <input name="email" id="email" className="input-text js-input" type="email" required />
                    <label className="label" htmlFor="email">이메일</label>
                </div>   
                <div className="form-field col-lg-5">
                    <input name="file" id="file" type="file" />
                </div>
                <div className="form-field col-lg-12">
                    <input name="message" id="message" className="input-text js-input" type="text" required />
                    <label className="label" htmlFor="message">문의 내용</label>
                </div>
                <div className="form-field submit-container col-lg-12">
                    <input onSubmit={onSubmit} className="submit-btn" type="submit" value="보내기" />
                </div>
            </form>
        </div>
        </>
    )
}

export default Contact;
