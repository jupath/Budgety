import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { startCreateUserWithEmailAndPass } from '../../actions/auth';
import { LOGIN } from '../../constants/routes';

class SignUpPage extends Component {
  state = {
    email: '',
    password1: '',
    password2: '',
    error: undefined,
  };

  onChangeEmail = (event) => {
    const email = event.target.value;
    this.setState({ email });
  }

  onChangePassword = (event) => {
    const password1 = event.target.value;
    this.setState({ password1 });
  }

  onChangePassword1 = (event) => {
    const password2 = event.target.value;
    this.setState({ password2 });
  }

  doCreateUser = (email, password) => {
    this.props.createUser(email, password)
      .then(() => {
        if (this.props.authError) {
          this.setState({ error: this.props.authError });
        } else {
          this.setState({ error: undefined });
        }
      });
  }

  handleCreateUser = (event) => {
    event.preventDefault();
    const { email, password1, password2 } = this.state;
    if (email === '' || password1 === '' || password2 === '') {
      this.setState({ error: 'Please, fill out every field!' });
    } else if (password1 !== password2) {
      this.setState({ error: 'The passwords are different!' });
    } else {
      this.doCreateUser(email, password1);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleCreateUser}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required="required"
            onChange={this.onChangeEmail}
          />
          <input
            type="password"
            name="password1"
            placeholder="Password"
            required="required"
            onChange={this.onChangePassword}
          />
          <input
            type="password"
            name="password2"
            placeholder="Password again"
            required="required"
            onChange={this.onChangePassword1}
          />
          { this.state.error && <p>{this.state.error}</p> }
          <button>Sign up</button>
        </form>
        <p>Already have an account? <Link to={LOGIN}>Log in</Link></p>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  createUser: PropTypes.func.isRequired,
  authError: PropTypes.string,
};

SignUpPage.defaultProps = {
  authError: undefined,
};

const mapStateToProps = state => ({
  authError: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  createUser: (email, password) => dispatch(startCreateUserWithEmailAndPass(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
