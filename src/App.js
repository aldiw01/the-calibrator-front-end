import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
// const Register = React.lazy(() => import('./views/Pages/Register'));
const ResetPassword = React.lazy(() => import('./views/Pages/ResetPassword'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

// Certificates
const Calibration = React.lazy(() => import('./views/Certificates/Calibration/Calibration'));
const QualtyAssurance = React.lazy(() => import('./views/Certificates/QualityAssurance'));
const TestApproval = React.lazy(() => import('./views/Certificates/TestApproval'));
const VoluntaryTest = React.lazy(() => import('./views/Certificates/VoluntaryTest'));

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            {/* Certificate Page */}
            <Route path="/requests/:id/cal/certificate" name="Certificate" render={props => <Calibration {...props} />} />
            <Route path="/requests/:id/qa/certificate" name="Certificate" render={props => <QualtyAssurance {...props} />} />
            <Route path="/requests/:id/ta/certificate" name="Certificate" render={props => <TestApproval {...props} />} />
            <Route path="/requests/:id/vt/certificate" name="Certificate" render={props => <VoluntaryTest {...props} />} />

            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route path="/login/:id" name="Login Page" render={props => <Login {...props} />} />
            {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} /> */}
            <Route path="/resetpassword/:token" name="Reset Password" render={props => <ResetPassword {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
