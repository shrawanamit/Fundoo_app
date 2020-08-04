import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './Components/Registration';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import SighIn from './Components/SighIn';
import DashBord from './Components/DashBoard';


function App() {
  return (
    <div>
    <Router>
      <Route exact path="/" component={ Registration} />
      <Route exact path="/signin" component={ SighIn} />
      <Route exact path="/forgotPassoword" component={ForgotPassword} />
      <Route exact path="/resetPassoword" component={ResetPassword} />
      <Route exact path="/dashBord" component={DashBord} />
    </Router>
  </div>
  );
  }

export default App;
