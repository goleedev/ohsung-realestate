import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import About from 'routes/About';
import Search from 'routes/Search';
import SearchDetail from 'routes/SearchDetail';
import Youtube from 'routes/Youtube';
import Contact from 'routes/Contact';

const sitemapRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/youtube" component={Youtube} />
                <Route exact path="/search" component={Search} />
                {/* <Route exact path="/search/:id" component={SearchDetail} /> */}
                <Route exact path="/contact" component={Contact} />
            </Switch>
        </Router>
    );
};

export default sitemapRouter;
