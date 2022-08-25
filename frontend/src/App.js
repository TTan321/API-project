import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots/spots";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import AddSpotForm from "./components/AddSpot/AddSpotForm";
import EditSpot from './components/EditSpot/EditSpot';

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
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/hostspot">
            <AddSpotForm />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetails />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <EditSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
