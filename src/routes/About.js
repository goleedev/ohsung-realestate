import React from 'react';
import Typewriter from 'typewriter-effect';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import Navigation from 'components/Navigation';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import icon from '../images/icon.png';
import './About.css';

const About = () => {
    return (
        <>
        <Navigation/>
        <div className="about-container container-fluid col-lg-12 row">
            <div>
                <div className="about-header col-lg-12">
                    <h1 className="about-title">THE STORY OF
                        <Typewriter
                        options={{
                        strings: ['오성공인중개사 사무소', 'e-오성공인중개사 사무소'],
                        autoStart: true,
                        loop: true,
                        }}      
                        />    
                        <span className="about-title-bottom">@ohsung</span>
                    </h1>
                </div>
                <p className="about-content-top">
                    <span>
                        <FontAwesomeIcon icon={faQuoteLeft} color={"#969696"} size="2x" /> 
                    </span> 모든 사람들은
                선한 부(富)와 자신의 소유로 건물을 갖고자
                열심히 종잣돈을 모읍니다.
                그 꿈의 종잣돈을 모으는
                고객님의 마음을 이해하고 응원하고자
                오성은 중개라는 책임 있는 일을 시작했습니다
                </p>
                <div className="about-content-wrapper">
                    <div className="about-content-bottom">
                        <img src={icon} className="about-pic" alt="about-pic"/> 
                        <p>
                        성실과 책임을 바탕으로
                        토지, 건물, 상가 각 분야의
                        전문 중개사 세 분이 함께합니다.
                        </p>
                        <br />
                        <span>life in cheonan</span>
                        <br />
                        <br />
                        <p>
                        전문성과 가장 중요한 고객의
                        마음을 헤아려 중개하는
                        오성 공인 중개사무소가 되고자
                        늘 도전하고 고객님과 부유로 함께하는 오성부동산이 되겠습니다.
                        </p> 
                    </div> 
                </div>
            </div>
        </div>
        <FooterLink />
        <Footer/>        
        </>
    );
};

export default About;
