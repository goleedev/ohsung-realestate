import React, { useState } from 'react';
import { dbService } from "fbase";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Typewriter from 'typewriter-effect';
import building from 'images/home-building.png';
import circle1 from '../images/home-circle2.png';
import circle2 from '../images/home-circle3.png';
import './Header.css';

const Header = () => {
    const history = useHistory();
    const [searchInput, setSearchInput] = useState("");

    // eslint-disable-next-line
    const [products, setProducts] = useState([]);
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setSearchInput(value);
    };
    const onClick = () => {
        let title = document.title;
        let url = window.location.href;
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
    };
    const onSubmit = (event) => {
        event.preventDefault();
        if (searchInput !== "" && searchInput !== " ") {
            dbService
                .collection('products')
                .where('tags', 'array-contains-any', [searchInput])
                .onSnapshot((snapshot) => {
                    let productArray = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setProducts(productArray);
                    history.push({
                    pathname: '/search',
                    search: `/query?${searchInput}`,
                    state: { data: searchInput }
                    });
                });
            window.scrollTo(0, 0);
        };
        event.target.reset();
        setSearchInput("");
    };
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
                <form id="home-search-tab" onSubmit={onSubmit} className="input-group input-group-lg home-search">
                    <input
                    onChange={onChange}    
                    type="text"
                    autoComplete="off"        
                    className="form-control col-xs-8"
                    placeholder="지역명/지하철역을 입력해주세요."
                    name="search"
                    value={searchInput}   
                    />
                    <input
                    type="submit"
                    value="검색"
                    className="btn search-btn"
                    />
                </form>
            </div>
            <div className="col-lg-6">
                <img data-aos="fade-up" data-aos-duration="1000" src={building} className="home-building" alt="building" />
            </div>
            <div className="home-circle flex-column d-flex">
                <a href="tel:07040428642">
                    <img src={circle1} alt="call"/>
                </a>
                <span onClick={onClick}>
                    <img src={circle2} alt="favorite"/>
                </span>
            </div>
        </div>
        </>
    );
};

export default Header;
