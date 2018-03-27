import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startSignInWithEmailAndPassword } from '../../actions/auth';

class LoginForm extends Component {
  state = {
    error: undefined,
  }

  doSignIn = (email, password) => {
    this.props.signInUser(email, password)
      .then(() => {
        if (this.props.authError) {
          this.setState({ error: this.props.authError });
        } else {
          this.setState({ error: undefined });
        }
      });
  }

  handleSignIn = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    if (email === '' || password === '') {
      this.setState({ error: 'Please, fill out every field!' });
    } else {
      this.doSignIn(email, password);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignIn}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required="required"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required="required"
          />
          { this.state.error && <p>{this.state.error}</p> }
          <button>Login</button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  signInUser: PropTypes.func.isRequired,
  authError: PropTypes.string,
};

LoginForm.defaultProps = {
  authError: undefined,
};

const mapStateToProps = state => ({
  authError: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  signInUser: (email, password) => dispatch(startSignInWithEmailAndPassword(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
