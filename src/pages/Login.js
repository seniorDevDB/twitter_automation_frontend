
import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { login } from "../api/UserFunction";

const validEmailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: {email: '', password: ''},
      show: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.signup_alert){
      this.setState({ show: true })
    }
  
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.handleErrors(e.target.name, e.target.value);
  }

  handleErrors (field, val) {
    switch(field) {
      case 'email':
        if( !validEmailRegex.test(val) ) {
          this.setState({error: {...this.state.error, email: 'Email is not a valid!'}});
        } else {
          this.setState({error: {...this.state.error, email: 'T'}});
        }
        break;
      case 'password':
        if( val.length < 8 ) {
          this.setState({error: {...this.state.error, password: 'Password must be at least 8 characters!'}});
        } else {
          this.setState({error: {...this.state.error, password: 'T'}});
        }
        break;
      default:
        break;
    }
  }

  handleModalClose = () => {
    localStorage.removeItem("signup_alert")
    this.setState({ show: false })
  }

  onSubmit(e) {
    e.preventDefault();
    
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log("logged clicked");
    login(user).then((res) => {
      if (res) {
        if (res.error) {
          this.setState({ error: {...this.state.error, password: 'Wrong Credential!' }});
        } 
        else {
            console.log("login sueccess")
            this.props.history.push("/");
        }
      }
    });
  }

  render() {
    return (
      <div style={{height: "100vh",backgroundColor: "white"}}>
      <div className="container" style={{paddingTop: "50px"}}>
        <div className="jumbotron mt-5" style={{ textAlign: "center",backgroundColor: "#5dbcd2" }}>
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form noValidate onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                { this.state.error.email.length > 2 && <label style={{ color: "red" }}>{this.state.error.email}</label> }
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                { this.state.error.password.length > 2 && <label style={{ color: "red" }}>{this.state.error.password}</label> }
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                  disabled={this.state.error.email !== "T" || this.state.error.password !== "T" }
                >
                  Sign in
                </button>
                {/* <p style={{ marginTop: "10px" }}>
                  Don't have an account? <a href="register">Sign Up</a>
                </p>
                <p style={{ marginTop: "10px" }}>
                  <a href="forgotpassword">Forgot password?</a>
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Login;