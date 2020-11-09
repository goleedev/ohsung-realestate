import React from 'react';
import Navigation from 'components/Navigation';
import Header from 'components/Header';
import ProductRecommend from 'components/ProductRecommend';
import ProductCards from 'components/ProductCards';
import YoutubeCards from 'components/YoutubeCards';
import FooterLink from 'components/FooterLink';
import Footer from 'components/Footer';
import './Home.css'

const Home = () => {
    return (
        <div className="home">
            <div className="header-top">
                <Navigation />
                <Header />
            </div>
            <ProductCards />
            <ProductRecommend />
            <YoutubeCards />
            <FooterLink />
            <Footer />
        </div>
    );
};

export default Home;
