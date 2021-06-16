import React from 'react';
import { TableProvider } from './context/tableContext';
import { GlobalProvider } from './context/globalContext';
import Standings from './pages/Standings';
import Navbar from './components/Navbar';
import SelectSeason from './components/SelectSeason';
import Schedule from './pages/Schedule';
import Error from './pages/Error';
import Races from './pages/Races';
import RaceResults from './pages/RaceResults';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <SelectSeason />
          <Navbar />
          <TableProvider>
            <Switch>
              <Route exact path='/'>
                <Standings />
              </Route>
              <Route path='/schedule'>
                <Schedule />
              </Route>
              <Route path='/races'>
                <Races />
              </Route>
              <Route path='/single-race/:round'>
                <RaceResults />
              </Route>
              <Route path='*'>
                <Error />
              </Route>
            </Switch>
          </TableProvider>
        </Router>
      </GlobalProvider>
    </>
  );
}

export default App;
