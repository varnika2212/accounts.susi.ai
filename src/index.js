import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  hashHistory,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';

import SignUp from './components/Auth/SignUp/SignUp.react';
import Logout from './components/Auth/Logout.react';
import ChangePassword from './components/Auth/ChangePassword/ChangePassword.react';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword.react';
import DeleteAccount from './components/Auth/DeleteAccount/DeleteAccount.react';
import Settings from './components/Settings/Settings.react';
import Admin from './components/Admin/Admin.js';
import Users from './components/Admin/ListUser/ListUser.js';
import Skills from './components/Admin/ListSkills/ListSkills.js';
import SystemSettings from './components/Admin/SystemSettings/SystemSettings.js';
import SystemLogs from './components/Admin/SystemLogs/SystemLogs.js';
import VerifyAccount from './components/Auth/VerifyAccount/VerifyAccount.react';
import Login from './components/Auth/Login/Login.react';
import NotFound from './components/NotFound/NotFound.react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import './index.css';

const styles = {
  app: {
    width: '100%',
    height: '100%',
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarOpen: false,
      snackBarMessage: '',
      snackBarDuration: 4000,
      snackBarAction: null,
      snackBarActionHandler: null,
    };
  }

  componentDidMount = () => {
    window.addEventListener('offline', this.onUserOffline);
    window.addEventListener('online', this.onUserOnline);
  };

  componentWillUnmount = () => {
    window.removeEventListener('offline', this.onUserOffline);
    window.removeEventListener('online', this.onUserOnline);
  };

  onUserOffline = () => {
    this.openSnackBar({
      snackBarMessage: 'It seems you are offline!',
    });
  };

  onUserOnline = () => {
    this.openSnackBar({
      snackBarMessage: 'Welcome back!',
    });
  };

  openSnackBar = ({
    snackBarMessage,
    snackBarDuration = 4000,
    snackBarActionHandler,
    snackBarAction,
  }) => {
    this.setState({
      snackBarOpen: true,
      snackBarMessage,
      snackBarDuration,
      snackBarActionHandler,
      snackBarAction,
    });
  };

  closeSnackBar = () => {
    this.setState({
      snackBarOpen: false,
      snackBarMessage: '',
      snackBarDuration: 4000,
      snackBarAction: null,
      snackBarActionHandler: null,
    });
  };

  render() {
    const {
      snackBarOpen,
      snackBarMessage,
      snackBarDuration,
      snackBarAction,
      snackBarActionHandler,
    } = this.state;

    return (
      <Router history={hashHistory}>
        <MuiThemeProvider>
          <div style={styles.app}>
            <div id="outer-container">
              <main id="page-wrap" />
            </div>
            <Snackbar
              autoHideDuration={snackBarDuration}
              action={snackBarAction}
              onActionTouchTap={snackBarActionHandler}
              open={snackBarOpen}
              message={snackBarMessage}
              onRequestClose={this.closeSnackBar}
            />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/changepassword" component={ChangePassword} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/logout" component={Logout} />
              <ProtectedRoute exact path="/settings" component={Settings} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin/users" component={Users} />
              <Route exact path="/admin/skills" component={Skills} />
              <Route exact path="/admin/settings" component={SystemSettings} />
              <Route exact path="/admin/logs" component={SystemLogs} />
              <Route exact path="/verify-account" component={VerifyAccount} />
              <Route exact path="/resetpass" component={ResetPassword} />
              <Route exact path="/delete-account" component={DeleteAccount} />
              <Route exact path="/*:path(error-404|)" component={NotFound} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
