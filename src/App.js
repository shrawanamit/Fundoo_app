import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './Components/Registration';
import ForgotPassword from './Components/ForgotPassword';
import SighIn from './Components/SighIn';


function App() {
  return (
    <div>
    <Router>
      <Route exact path="/" component={ Registration} />
      <Route exact path="/signin" component={ SighIn} />
      <Route exact path="/forgotPassoword" component={ForgotPassword} />
    </Router>
  </div>
  );
  }

export default App;
