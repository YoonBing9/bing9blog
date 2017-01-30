import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  onLogin: React.PropTypes.func,
};
const defaultProps = {
  onLogin: (id, pw) => { console.error("login function not defined"); },
};

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state={
          password1 : "",
          password2 : "",
          username: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
    }

    handleLogin() {
      let password1 = this.state.password1;
      let password2 = this.state.password2;

      console.log("log!! "+password1+" "+password2);

      this.props.onLogin(password1, password2).then(
        (success) => {
          if(!success) {
            this.setState({
              password1: '',
              password2: ''
            });
          }
        }
      );
    }

    render() {
      const loginView = (
        <div>
            <div className="card-content">
                <div className="row">
                    <div className="input-field col s12 username">
                        <label>First Password</label>
                        <input
                        name="password1"
                        type="password"
                        className="validate"
                        onChange={this.handleChange}/>
                    </div>
                    <div className="input-field col s12">
                        <label>Second Password</label>
                        <input
                        name="password2"
                        type="password"
                        className="validate"
                        onChange={this.handleChange}/>
                    </div>
                    <a className="waves-effect waves-light btn"
                      onClick={this.handleLogin}>SUBMIT</a>
                </div>
            </div>


            <div className="footer">
                <div className="card-content">
                    <div className="right" >
                    Are you Bing9?
                    </div>
                </div>
            </div>

        </div>
      );

        return(
          <div className="container auth">
            <Link className="logo" to="/">Bing9Blog</Link>
            <div className="card">
              <div className="header blue white-text center">
                  <div className="card-content">LOGIN</div>
              </div>
              { loginView }
            </div>
          </div>
        );
    }
}

Authentication.propTypes = propTypes;
Authentication.defaultProps = defaultProps;
export default Authentication;
