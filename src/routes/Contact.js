import React from 'react';
import emailjs from 'emailjs-com';
import { onReloadClick } from "functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import Navigation from 'components/Navigation';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import contact from '../images/contact.gif';
import './Contact.css';

const Contact = () => {
    const onSubmit = (event) => {
        event.preventDefault();
        emailjs.sendForm('service_r7g54mq', 'template_uoh0zdn', event.target, 'user_gU0Rwh0uJ4RbQHs2agu2n')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
        });
        setTimeout(function() {
            document.getElementById("alert").innerHTML = '';
        }, 3000);
        document.getElementById("alert").innerHTML = '정상적으로 접수되었습니다👋';
        event.target.reset();
    };
    return (
        <>
        <Navigation />
        <div className="get-in-touch container row">
            <h3 onClick={onReloadClick} className="title col-lg-12">문의하기</h3>
            <div className="col-lg-12">
                <img src={contact} alt="contact"/>
            </div> 
            <p id="alert" className="col-lg-12"></p>
            <div className="get-in-touch-content col-lg-12 row">
                <div className="get-in-touch-info col-lg-6 flex-column">
                    <h3>let's get in touch</h3>
                    <a href="tel:07040428642">
                        <FontAwesomeIcon icon={faPhoneVolume} /> 전화 <br/>
                        <span>041-523-3303</span>
                    </a>   
                    <a href="https://map.naver.com/v5/search/%EC%98%A4%EC%84%B1%EA%B3%B5%EC%9D%B8%EC%A4%91%EA%B0%9C%EC%82%AC%EC%82%AC%EB%AC%B4%EC%86%8C?c=14151521.9657581,4415887.5965258,15,0,0,0,dh">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> 주소 <br/>
                        <span>충청남도 천안시 서북구 두정동 545 삼보빌딩 1층</span>
                    </a>   
                </div>
                <form encType="multipart/form-data" method="post" onSubmit={onSubmit} className="contact-form row col-lg-6">
                    <div className="form-field col-lg-6">
                        <input name="name" id="name" className="input-text js-input" type="text" required />
                        <label className="label" htmlFor="name">성함</label>
                    </div>
                    <div className="form-field col-lg-6">
                        <select name="options" id="options" className="input-text js-input">
                            <option value=""></option>
                            <option value="매물 구하기">매물 구하기</option>
                            <option value="매물 팔기">매물 팔기</option>
                            <option value="매물 투어하기">매물 투어하기</option>
                            <option value="기타 문의">기타 문의</option>     
                        </select>
                        <label className="label file-label" htmlFor="options">문의 종류</label>
                    </div>    
                    <div className="form-field col-lg-12">
                        <input name="email" id="email" className="input-text js-input" type="email" required />
                        <label className="label" htmlFor="email">이메일</label>
                    </div>  
                    <div className="form-field col-lg-12">
                        <input name="phone" id="phone" className="input-text js-input" type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required />
                        <label className="label" htmlFor="phone">전화번호</label>
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
        </div>
        <FooterLink/>
        <Footer/>    
        </>
    );
};

export default Contact;
