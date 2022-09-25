import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import Spots from "./components/Spots/spots";
import UserSpots from "./components/AddSpot/index";
import EditSpot from './components/EditSpot/EditSpot';
import NoUserSpotDetails from "./components/SpotDetails/NoSessionUser";
import LoginForm from "./components/LoginFormPage/index";
import UserReviews from "./components/UserReviews/UserReviews";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Spots />
          </Route>
          <Route exact path="/hostspot">
            <UserSpots />
          </Route>
          <Route exact path="/reviews">
            <UserReviews />
          </Route>
          <Route exact path="/spots/:spotId">
            <NoUserSpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
