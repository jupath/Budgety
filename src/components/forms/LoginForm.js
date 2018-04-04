import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
        <Form onSubmit={this.handleSignIn}>
          <FormGroup>
            <Label className="sr-only" for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required="required"
            />
          </FormGroup>
          <FormGroup>
            <Label className="sr-only" for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required="required"
            />
          </FormGroup>
          { this.state.error && <p className="text-danger">{this.state.error}</p> }
          <Button color="success">Login</Button>
        </Form>
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
