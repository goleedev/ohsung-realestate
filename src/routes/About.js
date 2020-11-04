import React from 'react';
import Typewriter from 'typewriter-effect';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import Navigation from 'components/Navigation';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import me from '../images/hun.png';
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
                    </span> 어렸을 때부터 만들기를 좋아했던 한 아이가 
                        흙의 촉감과 불의 신비한 매력에 빠져
                        도예가가 되었습니다.
                </p>
                <div className="about-content-wrapper">
                    <div className="about-content-bottom">
                        <img src={me} className="about-pic" alt="about-pic"/> 
                        <p>
                            도자기는 다양한 흙의 종류와 유약들의 만남으로
                            불 안에서 일어나는 일은 예측할 수 없기에
                            시간이 지나도 가마를 열 때마다 설레는 마음은 언제나 한결같습니다. 
                            그래서 작품 하나하나의 소중함을 다시 한번 생각하게 됩니다.
                        </p>
                        <br/>
                        <span>life in cheonan</span>
                        <br />
                        <br/>
                        <p>
                            오수진 도자기는 도자기의 매력에 빠진
                            도예가 오수진이 생활 속 도자기들을
                            심플하고 모던한 형태와 컬러로 표현해보았습니다.
                            모든 작품은 물레 성형부터 가마 소성 및 판매까지
                            모두 수작업으로 직접 만들고 운영하고 있습니다.
                        </p> 
                    </div> 
                </div>
            </div>
        </div>
        <FooterLink />
        <Footer/>        
        </>
    )
}

export default About;
