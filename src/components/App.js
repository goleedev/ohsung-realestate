import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../fbase';
import AOS from "aos";
import AppRouter from './Router';
import Loading from './Loading';
import "aos/dist/aos.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
        });
      } else {
        setUserObj(null);
      };
    });
    if (dbService) {
      setIsLoaded(true);
    };
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      { isLoaded ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : <Loading />}
    </>
  );
};

export default App;
