import React from 'react';
import Typewriter from 'typewriter-effect';
import building from 'images/home-building.png';
import circle1 from '../images/home-circle1.png';
import circle2 from '../images/home-circle2.png';
import circle3 from '../images/home-circle3.png';
import './Header.css';

const Header = () => {
    const onClick = () => {
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
        <div className="header container row">
            <div className="col-md-6">
                <h2>천안에서 찾는
                    <span className="home-type"> 
                        <Typewriter
                            options={{
                                strings: ['주택', '상가', '토지', '아파트'],
                                autoStart: true,
                                loop: true,
                        }}      
                        />         
                    </span>
                </h2>
                <div className="input-group input-group-lg home-search">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="지역명/지하철역을 입력해주세요."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2" 
                    />
                    <div className="input-group-append">
                        <button
                            className="btn search-btn"
                            type="button"> 검색
                        </button>
                    </div>
                </div>
            </div> 
            <div className="col-lg-6">
                <img data-aos="fade-up" data-aos-duration="1000" src={building} className="home-building"/>
            </div>    
            <div className="home-circle flex-column d-flex">
                <a href="">
                    <img src={circle1} />                
                </a>
                <a href="tel:07040428642">
                    <img src={circle2} />                
                </a>
                <span onClick={onClick}>
                    <img src={circle3} />                
                </span>    
            </div>   
        </div>
        </>
    )
}

export default Header;
