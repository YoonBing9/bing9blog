import React, { Component, PropTypes } from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import { browserHistory } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(password1, password2) {
      return this.props.loginRequest(password1, password2).then(
        () => {
          if(this.props.status === "SUCCESS") {
            let loginData = {
              isLoggedIn: true,
              username: this.props.username
            };

            document.cookie = 'key=' + btoa(JSON.stringify(loginData));

            Materialize.toast('Welcome, ' + this.props.username + '!', 2000);
            browserHistory.push('/');
            return true;
          } else {
            let $toastContent = $('<span style="color: #FFB4BA">Incorrect password1 or password2</span>');
            Materialize.toast($toastContent, 2000);
            return false;
          }
        }
      );
    }

    render() {
        return(
            <div>
              <div>this is Login page</div>
              <Authentication
                onLogin={this.handleLogin}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.login.status,
    username: state.authentication.status.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (password1, password2) => {
      return dispatch(loginRequest(password1, password2));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
